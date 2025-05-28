import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js ";
import { getFirestore, collection, onSnapshot, addDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js ";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js ";

// Firebase konfiguratsiya
const firebaseConfig = {
  apiKey: "AIzaSyASPn93j0gaTfRNuKZ3F6q47CGBeus2fzY",
  authDomain: "khivaimi1.firebaseapp.com",
  projectId: "khivaimi1",
  storageBucket: "khivaimi1.firebasestorage.app",
  messagingSenderId: "541131443062",
  appId: "1:541131443062:web:b68f095be3bc4ac61a0857",
  measurementId: "G-WFMQSESQXF"
};

// Firebase ni ishga tushirish
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, onSnapshot, addDoc, ref, uploadBytesResumable, getDownloadURL };