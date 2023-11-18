importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyDoTRW7E48ru-AuukI2dwfbcu9jt2wM_0g",
    authDomain: "historinhas-18386.firebaseapp.com",
    projectId: "historinhas-18386",
    storageBucket: "historinhas-18386.appspot.com",
    messagingSenderId: "377869314621",
    appId: "1:377869314621:web:58ffe37b10a901514d9854",
    measurementId: "G-G9REXF7HZK"
};
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();
/*
messaging.onBackgroundMessage(function(payload) {
    console.log(payload)
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body
    }
    self.registration.showNotification(notificationTitle, notificationOptions);
})
*/
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});