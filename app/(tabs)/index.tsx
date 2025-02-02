// app/(tabs)/index.tsx
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Softball Team Manager</Text>
      <Text style={styles.subtitle}>
        Manage your teams, track games, and analyze stats all in one place.
      </Text>
      
      <Pressable 
        style={styles.button} 
        onPress={() => {
          console.log('Button pressed'); // Add this to debug
          router.push('/auth/register');
        }}
      >
        <Text style={styles.buttonText}>REGISTER NOW</Text>
      </Pressable>
      <Pressable 
          style={[styles.button, styles.loginButton]} 
          onPress={() => {
            console.log('Login button pressed');
            router.push('/auth/login');
          }}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white', // Add this to ensure visible background
  },
  loginButton: {
    backgroundColor: '#34C759', // Different color for login button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Add this to ensure visible text
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: 'black', // Add this to ensure visible text
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3, // Add shadow for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});