// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, authService } from '../services/auth';

export type User = {
  id: string;
  email: string | null;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<User>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Add this hook export
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
        });
        router.replace('/(tabs)');
      } else {
        setUser(null);
        router.replace('/(tabs)');
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn: authService.signIn,
    signUp: async (email: string, password: string, name: string) => {
      const firebaseUser = await authService.signUp(email, password, name);
      return {
        id: firebaseUser.uid,
        email: firebaseUser.email,
      };
    },
    // Make sure this matches your auth service
    signOut: async () => {
      await authService.logout(); // If your auth service uses 'logout' instead of 'signOut'
      setUser(null);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};