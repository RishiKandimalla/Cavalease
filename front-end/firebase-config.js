// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGl1FE1i5YxcEhAtgjDm2NFeQHQjYgp3c",
  authDomain: "cavalease.firebaseapp.com",
  projectId: "cavalease",
  storageBucket: "cavalease.firebasestorage.app",
  messagingSenderId: "310559037285",
  appId: "1:310559037285:web:643276ad6483f7187ef38c",
  measurementId: "G-KTCFMD8LPB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);  // This will allow you to authenticate users
const provider = new GoogleAuthProvider();  // Google authentication provider

// Export auth and provider so you can use them elsewhere
export { auth, provider };