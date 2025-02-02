// src/components/teams/CreateTeamForm.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { teamService } from '../../services/team/teamService';

interface CreateTeamFormProps {
  onSuccess?: (teamId: string) => void;
  onCancel?: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSuccess, onCancel }) => {
  const [name, setName] = useState('');
  const [season, setSeason] = useState(new Date().getFullYear().toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Team name is required');
      return;
    }

    setIsLoading(true);

    try {
      // Test if we can access teamService
      console.log('Creating team with:', { name, season });
      const teamId = await teamService.createTeam({ name, season });
      console.log('Team created with ID:', teamId);
      
      Alert.alert(
        'Success',
        'Team created successfully!',
        [{ text: 'OK', onPress: () => onSuccess?.(teamId) }]
      );
    } catch (err) {
      console.error('Error creating team:', err);
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to create team');
    } finally {
      setIsLoading(false);
    }
  };
// interface CreateTeamFormProps {
//   onSuccess?: (teamId: string) => void;
//   onCancel?: () => void;
// }

// const CreateTeamForm: React.FC<CreateTeamFormProps> = ({ onSuccess, onCancel }) => {
//   const [name, setName] = useState('');
//   const [season, setSeason] = useState(new Date().getFullYear().toString());
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!name.trim()) {
//       Alert.alert('Error', 'Team name is required');
//       return;
//     }

//     // Temporary success simulation
//     Alert.alert(
//       'Success',
//       'Team created successfully!',
//       [{ text: 'OK', onPress: () => onSuccess?.('test-id') }]
//     );
//   };

  return (
    <View style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Team Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter team name"
          placeholderTextColor="#9ca3af"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Season</Text>
        <TextInput
          style={styles.input}
          value={season}
          onChangeText={setSeason}
          placeholder="Enter season (e.g., 2024)"
          placeholderTextColor="#9ca3af"
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <View style={styles.buttonGroup}>
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={isLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.submitButton, isLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Creating...' : 'Create Team'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    backgroundColor: 'white',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#2563eb',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButtonText: {
    color: '#4b5563',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CreateTeamForm;