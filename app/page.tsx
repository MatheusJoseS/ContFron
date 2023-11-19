"use client"
import React, { useEffect, useState } from 'react'
import Image from '@/node_modules/next/image'
import axios from '@/node_modules/axios/index'
import api from './shaed/utils/my-axios'
import useFcmToken from '@/utils/useFcmToken'
import firebaseApp from '@/utils/firebase'

// import api from './shaed/utils/my-axios'

interface TokenResponse {
  data: {
    token: string;
  }
}
export default function Login() {
  const [ecadastro, setecadastro] = useState(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [goo, setGoo] = React.useState({ title: '', body: '' })
  const [from, setFrom] = React.useState<{ email_user: string; nome_user: string; senha_user: string; senha_user_comfir: string; }>({ email_user: '', nome_user: '', senha_user: '', senha_user_comfir: '', })
  const [cor, setCor] = React.useState("#1E3A8A")
  const [erro, setErro] = React.useState('')
  const googleLogoUrl = "https://cdn-icons-png.flaticon.com/512/281/281764.png?w=740&t=st=1691100843~exp=1691101443~hmac=a30f55d5ff66b960de01a09d3cc7882cd6fd49341fdc97cfb099ed6a7bcde8a9"
  const session = await getServerSession(authOpitions)
  const { fcmToken, notificationPermissionSattus } = useFcmToken();
  fcmToken && console.log('FCM token:', fcmToken);
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      const messaging = getMessaging(firebaseApp);
      const unsubscribe = onMessage(messaging, (payload) => {
        console.log('Foreground puch notification received:', payload);
        setGoo({ 'title': payload.notification?.title || '', 'body': payload.notification?.body })
      });
      return () => {
        unsubscribe();
      }
    }
  })
  const mudanca = () => {
    limpar();
    cadastro();
  }
  const limpar = () => {
    const nada = {
      nome_user: '',
      senha_user_comfir: '',

    };
    const novoEstado = {
      ...from,
      ...nada
    };

    setFrom(novoEstado);
  }

  const cadastro = () => {
    setecadastro(!ecadastro)
  }
  const getData = (e: any) => {
    const { name, value } = e.target
    setFrom({ ...from, [name]: value })
  }
  const mudarCor = () => {
    const vermelho = ("#F60000")
    setCor(vermelho)
  }
  const erroo = () => {
    const eroo = ('senha errada')
    setErro(eroo)
  }
  const submit = async (e: any) => {
    try {
      setLoading(true);
      e.preventDefault()
      if (from.senha_user_comfir == '') {
        const login = {
          email: from.email_user,
          password: from.senha_user
        }
        const response = await api.post("/auth/login", login)
        localStorage.setItem("token", response.data.token)
        location.href = "http://localhost:3000/home"
        setLoading(false)
      } else {
        if (from.senha_user == from.senha_user_comfir) {
          const response = await api.post("/auth/sign-up", from)
          alert("cadastro:ok")
          setLoading(false)
        } else {
          erroo()
        }
      }
    } catch (err) {
      alert("erro no Ligin/Cadastro")
      mudarCor();
    }
  }
  return (
    <main style={{ background: "#717EC7" }} className='flex justify-between p-12 w-screen h-screen'>
      <img src="/imagens/imagem3.png" alt="C do cont;nue" tabIndex={20} />
      <div className='mr-28 -mt-10'>
        <div style={{ borderRadius: '5rem' }} className='bg-slate-50 px-20 mt-10'>
          <div className="flex flex-col justify-center px-6 py-12 ">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img tabIndex={7} className="mx-auto h-36 w-36" src="/imagens/logo2.png" alt="Logo do cont;nui(a Azul)" id='logo' />
              <h2 tabIndex={8} style={{ fontFamily: 'coustard' }} id="cont" className="font-sans mt-1 text-6xl font-bold leading-9 tracking-tight text-blue-700 text-center ">Cont;nue</h2>
            </div>
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST">
                <div>
                  <div className="mt-2">
                    {ecadastro ?
                      <input tabIndex={9} style={{ borderColor: cor }} onChange={getData} id="nome_user" name="nome_user" type="text" placeholder='Nome:' autoComplete="current-password" min={0} required className="mt-5 border-b-2  block w-96 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                      : null}
                  </div>
                  <div className="mt-2">
                    <input tabIndex={10} style={{ borderColor: cor }} onChange={getData} id="email_user" name="email_user" type="email" placeholder='Email:' value={from.email_user} required className="mt-5 border-b-2 w-96 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      {ecadastro ? null : <a tabIndex={12} href="#" className="relative top-14 ml-60 font-semibold text-indigo-600 hover:text-indigo-500">Esqueceu a Senha?</a>}
                    </div>
                  </div>
                  <div className="mt-2">
                    <input tabIndex={11} style={{ borderColor: cor }} onChange={getData} id="senha_user" name="senha_user" type="password" placeholder='Senha:' value={from.senha_user} required className="mt-7 border-b-2  block w-96 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                  <div className="mt-2">
                    {ecadastro ?
                      <div>
                        <input tabIndex={12} onChange={getData} id="senha_user_comfir" style={{ borderColor: cor }} name="senha_user_comfir" type="password" placeholder='Confirmar a senha:' autoComplete="current-password" required className="mt-7 border-b-2  block w-96 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-blue-200 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        <div style={{ color: '#F60000', fontSize: '10px' }} tabIndex={13}>{erro}</div>
                      </div>
                      : null}
                  </div>
                </div>
                <div>
                  <button onClick={submit} tabIndex={16} type="submit" className="mt-5 flex h-14 w-full justify-center rounded-md bg-indigo-600 p-4 text-4xl  font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mx-auto"> {ecadastro ? "Cadastrar-se" : "Entrar"}</button>
                  {ecadastro ? null :
                    <div>
                      <p tabIndex={17} className='text-blue-700 text-5xl font-black text-center mt-5 mb-5'>ou</p>
                      <button type='submit' className='text-2xl hover:bg-slate-200 bg-white w-full h-20 rounded-xl' tabIndex={18}><img src={googleLogoUrl} alt="Logo do google" className='w-12 relative top-4 left-3' /><div className='relative bottom-5'>Entrar com google</div></button>
                    </div>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className='px-28 pb-6 pt-5 text-center'>
          {ecadastro ? <button className="text-3xl bg-white w-80 hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded-full" tabIndex={6} onClick={cadastro}>Login</button> : <button onClick={cadastro} className="text-3xl bg-white w-80 hover:bg-blue-200 text-blue-500 font-bold py-2 px-4 rounded-full" tabIndex={6}>Cadastro</button>}
        </div>
        <h1 tabIndex={19} style={{ color: "#3D50B6" }} className='text-4xl underline text-center mt-6'><a href="/sobre"><strong> Sobre</strong></a></h1>
      </div>

      {goo.title &&
        <div id="toast-default" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z" />
            </svg>
            <span className="sr-only">Fire icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">{goo.body}</div>
          <button onClick={() => setGoo({title:'',body:''})} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
          </button>
        </div>
      }
    </main>
  )
}
