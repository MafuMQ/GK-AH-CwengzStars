// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMkU_qHWcy-PiPQRdD7BJN2ENDW5Nc5Oc",
  authDomain: "cyberquest-29884.firebaseapp.com",
  projectId: "cyberquest-29884",
  storageBucket: "cyberquest-29884.firebasestorage.app",
  messagingSenderId: "745631881295",
  appId: "1:745631881295:web:029c917f0ff24bc3b7f23a",
  measurementId: "G-L9RQTC3VGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Auth functions
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  app,
  analytics,
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};