import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(tabs)/teams" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          title: 'Sign In',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Create Account',
        }}
      />
    </Stack>
  );
}