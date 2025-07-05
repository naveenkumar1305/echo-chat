// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBgprZkrPIhQacvTiGDAHYqHxX8haj93eA",
  authDomain: "echochat-8e15b.firebaseapp.com",
  projectId: "echochat-8e15b",
  storageBucket: "echochat-8e15b.appspot.com",
  messagingSenderId: "247133613432",
  appId: "1:247133613432:web:38298fe9cba4091453ec8d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);