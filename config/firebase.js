import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCam7aIJWmvBdM7IAeA6sYgODaojnxqtgU",
    authDomain: "chatapp-fa52e.firebaseapp.com",
    projectId: "chatapp-fa52e",
    storageBucket: "chatapp-fa52e.appspot.com",
    messagingSenderId: "615837576077",
    appId: "1:615837576077:web:3f1353e72829c5b8c76bc4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth and Firestore instances
export const auth = getAuth(app);
export const firestore = getFirestore(app);
