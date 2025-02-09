// app/_layout.tsx
import { View } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const theme = {
    light: {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: '#2563eb',     // Blue primary color
        background: '#ffffff',   // White background
        card: '#ffffff',        // White card background
        text: '#0f172a',        // Dark text
        border: '#e2e8f0',      // Light gray border
        notification: '#ef4444', // Red notification badge
      },
    },
    dark: {
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        primary: '#3b82f6',     // Slightly lighter blue for dark mode
        background: '#0f172a',  // Dark background
        card: '#1e293b',        // Slightly lighter dark for cards
        text: '#f8fafc',        // Light text
        border: '#334155',      // Darker border
        notification: '#f87171', // Lighter red for dark mode
      },
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? theme.dark : theme.light}>
        <Stack 
          screenOptions={{
            headerStyle: {
              backgroundColor: colorScheme === 'dark' ? theme.dark.colors.card : theme.light.colors.card,
            },
            headerTintColor: colorScheme === 'dark' ? theme.dark.colors.text : theme.light.colors.text,
            headerTitleStyle: {
              fontWeight: '600',
            },
            contentStyle: {
              backgroundColor: colorScheme === 'dark' ? theme.dark.colors.background : theme.light.colors.background,
            },
          }}
        >
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="modal" 
            options={{
              presentation: 'modal',
              headerShown: true,
              headerBackTitle: 'Back',
            }}
          />
          <Stack.Screen 
            name="auth" 
            options={{ 
              headerShown: false,
              // Prevent going back to protected screens
              gestureEnabled: false,
            }} 
          />
        </Stack>
      </ThemeProvider>
    </View>
  );
}