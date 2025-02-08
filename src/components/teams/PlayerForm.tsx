import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { PlayerCreationData } from '@/src/types/player';
import { Position } from '@/src/types/team';

interface PlayerFormProps {
  teamId: string;
  onSubmit: (data: PlayerCreationData) => void;
  onCancel: () => void;
}

const PlayerForm: React.FC<PlayerFormProps> = ({ teamId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PlayerCreationData>({
    name: '',
    number: '',
    positions: [],
    teamId: teamId, // Include teamId from props
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.number || formData.positions.length === 0) {
      // Show validation error
      return;
    }
    onSubmit(formData);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Player Name"
        value={formData.name}
        onChangeText={(text) => setFormData({ ...formData, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Jersey Number"
        value={formData.number}
        onChangeText={(text) => setFormData({ ...formData, number: text })}
        keyboardType="numeric"
      />
      {/* Add position selector component here */}
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={onCancel} />
        <Button title="Save" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});

export default PlayerForm;