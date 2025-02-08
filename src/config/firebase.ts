// src/config/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from 'expo-constants';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP48v2E6VlpDhL0e1VlJRe6V0TYa3Xc8s",
  projectId: "dugoutbuddy-v1",
  storageBucket: "dugoutbuddy-v1.firebasestorage.app",
  messagingSenderId: "787602900766",
  appId: "1:787602900766:ios:aa2717e55229adf16c2b0f",
  authDomain: "dugoutbuddy-v1.firebaseapp.com",
};

console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey,
  projectId: firebaseConfig.projectId,
  // Log other values to verify they're being loaded correctly
});
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
