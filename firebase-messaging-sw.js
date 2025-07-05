importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyASPn93j0gaTfRNuKZ3F6q47CGBeus2fzY",
  authDomain: "khivaimi1.firebaseapp.com",
  projectId: "khivaimi1",
  messagingSenderId: "541131443062",
  appId: "1:541131443062:web:b68f095be3bc4ac61a0857"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Push keldi: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'xamkor2.jpg'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
