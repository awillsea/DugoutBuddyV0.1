import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  Auth
} from 'firebase/auth';

const firebaseConfig = {
  // Your Firebase config
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth: Auth = getAuth(app);

// Auth service functions
export const authService = {
  signIn: async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  },
  
  signUp: async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  },
  
  logout: async () => {
    return await signOut(auth);
  }
};

// Export types if needed
export type AuthService = typeof authService;