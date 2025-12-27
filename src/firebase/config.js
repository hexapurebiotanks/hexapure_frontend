// firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBdDhCkRErMa7ZQULgqipaDZA1VZCVmaz0",
  authDomain: "hexapure-13054.firebaseapp.com",
  projectId: "hexapure-13054",
  storageBucket: "hexapure-13054.firebasestorage.app",
  messagingSenderId: "1089999449642",
  appId: "1:1089999449642:web:16c452af810a2ac6281d53",
  measurementId: "G-TG01P9MB1Q"
};

let app;
let auth;
let db;
let storage;

export const initFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }

  return { app, auth, db, storage };
};
