import { useEffect, useState } from 'react';
import { router, useSegments } from 'expo-router';
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth';
import { auth } from '../config/firebase'; // Ensure this path matches your firebase config location


// Define hook return type for better TypeScript support
interface UseAuth {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

export function useAuth(): UseAuth {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const segments = useSegments();

  // Handle routing based on auth state
  useEffect(() => {
    if (!loading) {
      const inAuthGroup = segments[0]?.includes('auth');
      
      if (user && inAuthGroup) {
        // Redirect to main app if user is signed in and in auth group
        router.replace('/(tabs)');
      } else if (!user && !inAuthGroup) {
        // Redirect to auth if user is not signed in and trying to access protected routes
        router.replace('/auth/login');
      }
    }
  }, [user, loading, segments]);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred during sign in');
      throw e;
    }
  };

  // Sign up with email and password
  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      if (newUser) {
        await updateProfile(newUser, { displayName });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred during sign up');
      throw e;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An error occurred during logout');
      throw e;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    logout,
    error
  };
}