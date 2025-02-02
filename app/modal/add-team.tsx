import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AddTeamModal() {
  const router = useRouter();
  const [teamName, setTeamName] = useState('');
  const [leagueName, setLeagueName] = useState('');

  const handleCreateTeam = () => {
    // Here we'll eventually add the team to your backend
    console.log('Creating team:', { teamName, leagueName });
    router.back(); // Go back to teams screen
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Create New Team</Text>
        
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Team Name</Text>
            <TextInput
              style={styles.input}
              value={teamName}
              onChangeText={setTeamName}
              placeholder="Enter team name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>League Name (Optional)</Text>
            <TextInput
              style={styles.input}
              value={leagueName}
              onChangeText={setLeagueName}
              placeholder="Enter league name"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.createButton]}
            onPress={handleCreateTeam}
          >
            <Text style={styles.createButtonText}>Create Team</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // gray-50 equivalent
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
  },
  formContainer: {
    gap: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#374151', // gray-700 equivalent
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb', // gray-200 equivalent
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 32,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb', // gray-200 equivalent
  },
  createButton: {
    backgroundColor: '#2563eb', // blue-600 equivalent
  },
  cancelButtonText: {
    color: '#374151', // gray-700 equivalent
    fontWeight: '600',
  },
  createButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
