// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTNqy1dmL57MOcTR4HkYem8oxE42v4anQ",
  authDomain: "todoapp-f5a25.firebaseapp.com",
  projectId: "todoapp-f5a25",
  storageBucket: "todoapp-f5a25.firebasestorage.app",
  messagingSenderId: "929909687186",
  appId: "1:929909687186:web:9fc3537952d24ebb79374b",
  measurementId: "G-T5WFREBN0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Firestore instance
const auth = getAuth(app);
export { db, collection, addDoc };
export {app, auth};