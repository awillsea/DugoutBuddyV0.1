import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAP48v2E6VlpDhL0e1VlJRe6V0TYa3Xc8s",
  projectId: "dugoutbuddy-v1",
  storageBucket: "dugoutbuddy-v1.firebasestorage.app",
  messagingSenderId: "787602900766",
  appId: "1:787602900766:ios:aa2717e55229adf16c2b0f",
  // The authDomain is typically projectId.firebaseapp.com
  authDomain: "dugoutbuddy-v1.firebaseapp.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };