"use client";
import React from 'react'
import { GoogleLogin } from '@react-oauth/google';

const GoogleLogins = () => {
  const [willLogin, setWillLogin] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const responseGoogle = async (response: any) => {
    setLoading(true)
    
    try{console.log(response);
      const tokenId = response.credential;
      const clientId = response.clientId;
      const fcmToken = localStorage.getItem('fcmToken');
      fetch('http://localhost:38000/auth/login', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({token: tokenId, fcmToken})
      }).then(r => r.json()).then(data => localStorage.setItem("token", data.token));
    } finally {
      setLoading(false);
    }
    
  }
  
  const login = async (e: any) => {
    e.preventDefault();
    setWillLogin(true)
  }


  return (
    <div className="google">
          {willLogin ? 
          <GoogleLogin onSuccess={responseGoogle} ></GoogleLogin> :
          <button onClick={login} type="submit">Login com <img alt="Google Icon"  /></button> }
        </div>
  )

  }