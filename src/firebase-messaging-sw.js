importScripts(
    "https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js",
);
importScripts(
    "https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js",
);

firebase.initializeApp({
    apiKey: "AIzaSyDa3LkC9KpKWLIRsED_Eqt0tBW8ZFlsOmE",
    authDomain: "ioc-notification.firebaseapp.com",
    projectId: "ioc-notification",
    storageBucket: "ioc-notification.appspot.com",
    messagingSenderId: "45183912364",
    appId: "1:45183912364:web:b49a36e7f8f830e2a0d209",
    measurementId: "G-GWXPDMKGE1",
    vapidKey:
        "BB2DLT4MKKDo2CGCf8PUUI_9Cdzxhn6LLYLXJV1gD8Gqm7XhSKUd9DOF0qzAIm_jal-63FumsJLFwbTCwfDKqUI",
});
const messaging = firebase.messaging();
