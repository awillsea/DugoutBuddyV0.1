import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthInput } from '../../components/auth/AuthInput';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      setError('');
      await signIn(email, password);
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back!</Text>
      
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}

      <AuthInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <AuthInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.signInButton}
        onPress={handleLogin}
      >
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/auth/register" asChild>
        <TouchableOpacity>
          <Text style={styles.signUpText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  error: {
    color: '#EF4444', // red-500
    marginBottom: 16,
    textAlign: 'center',
  },
  signInButton: {
    backgroundColor: '#3B82F6', // blue-500
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  signInButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
  signUpText: {
    color: '#3B82F6', // blue-500
    textAlign: 'center',
  },
});