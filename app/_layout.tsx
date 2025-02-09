import { View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/src/context/AuthContext';
import { useEffect } from 'react';
import { auth } from '@/src/config/firebase';


function NavigationLayout() {
  const colorScheme = useColorScheme();

  // Add logging to track navigation state
  useEffect(() => {
    console.log('Navigation Layout mounted');
    return () => console.log('Navigation Layout unmounted');
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#000' : '#fff' }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
        </Stack>
      </ThemeProvider>
    </View>
  );
}

export default function RootLayout() {
  // Add logging to track Firebase initialization
  useEffect(() => {
    console.log('Firebase auth state:', auth.currentUser ? 'logged in' : 'logged out');
  }, []);

  return (
    <AuthProvider>
      <NavigationLayout />
    </AuthProvider>
  );
}