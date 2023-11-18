import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  };

export default firebaseApp;

const firebaseApp = initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);


export const requestForToken = (setTokenFound, setToken) => {
    return getToken(messaging, {vapidKey: process.env.REACT_APP_VAPIDKEY})
    .then((currentToken) => {
        if(currentToken){
            console.log("token atual: ", currentToken);
            setTokenFound(true);
            setToken(currentToken)
        } else {
            console.log("Falta permissao")
        }
    }).catch((err) => console.log("Um erro aconteceu - ", err))
}



export const onMessageListener = () => {
    return new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        })
    })
}