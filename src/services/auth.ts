// src/services/auth.ts
import { auth } from '@/src/config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { User } from '@/src/context/AuthContext'; // Import our custom User type

const firestore = getFirestore();

interface UserData {
  name: string;
  email: string;
  createdAt: Date;
}

export const authService = {
  signIn: async (email: string, password: string): Promise<void> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string): Promise<FirebaseUser> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      const userData: UserData = {
        name,
        email,
        createdAt: new Date(),
      };

      await setDoc(doc(firestore, 'users', user.uid), userData);

      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Helper function to convert Firebase User to our custom User type
  convertFirebaseUser: (firebaseUser: FirebaseUser): User => ({
    id: firebaseUser.uid,
    email: firebaseUser.email,
  })
};

export { auth };