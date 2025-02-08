import { auth } from '@/src/config/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { doc, setDoc, getFirestore } from 'firebase/firestore';

const firestore = getFirestore();

interface UserData {
  name: string;
  email: string;
  createdAt: Date;
}

export const authService = {
  signIn: async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw error;
    }
  },

  signUp: async (email: string, password: string, name: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user data in Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        name,
        email,
        createdAt: new Date(),
      });

      return user;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }
};

export { auth };