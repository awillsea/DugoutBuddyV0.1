// export type User = {
//     id: string;
//     email: string;
//     // Add other user fields
//   };
  
  export type AuthContextType = {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
  
  // src/services/auth.ts
  import { initializeApp } from 'firebase/app';
  import { 
    User,
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    signOut,
  } from 'firebase/auth';
  
  export type UseAuth = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
  };
  
  const firebaseConfig = {
    // Your Firebase config
  };
  
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  
  export const authService = {
    signIn: (email: string, password: string) => 
      signInWithEmailAndPassword(auth, email, password),
    
    signUp: (email: string, password: string) => 
      createUserWithEmailAndPassword(auth, email, password),
    
    logout: () => signOut(auth)
  };