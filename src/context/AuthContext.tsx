import React, { createContext, useContext, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, authService } from '../services/auth';

type User = {
  id: string;
  email: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
        });
        router.replace('/(tabs)'); // User is logged in, show tabs
      } else {
        setUser(null);
        router.replace('/'); // No user, show landing page
      }
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    signIn: authService.signIn,
    signUp: authService.signUp,
    logout: authService.logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;