// src/components/teams/PlayerForm.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { Position, PlayerCreationData } from "@/src/types/team";

interface PlayerFormProps {
  onSubmit: (playerData: PlayerCreationData) => Promise<void>;
  onCancel: () => void;
  initialData?: PlayerCreationData;
}

const POSITIONS: Position[] = [
  "P",
  "C",
  "1B",
  "2B",
  "3B",
  "SS",
  "LF",
  "CF",
  "RF",
  "DH",
  "EH",
  "SF",
  "ROV",
];

const PlayerForm: React.FC<PlayerFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || "");
  const [number, setNumber] = useState(initialData?.number || "");
  const [selectedPositions, setSelectedPositions] = useState<Position[]>(
    initialData?.positions || [],
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim() || !number.trim() || selectedPositions.length === 0) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit({
        name: name.trim(),
        number: number.trim(),
        positions: selectedPositions,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save player");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePosition = (position: Position) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter((p) => p !== position));
    } else {
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Player Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter player name"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Jersey Number *</Text>
        <TextInput
          style={styles.input}
          value={number}
          onChangeText={setNumber}
          placeholder="Enter jersey number"
          keyboardType="numeric"
          editable={!isLoading}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Positions *</Text>
        <View style={styles.positionsGrid}>
          {POSITIONS.map((position) => (
            <Pressable
              key={position}
              style={[
                styles.positionButton,
                selectedPositions.includes(position) &&
                  styles.positionButtonSelected,
              ]}
              onPress={() => togglePosition(position)}
              disabled={isLoading}
            >
              <Text
                style={[
                  styles.positionButtonText,
                  selectedPositions.includes(position) &&
                    styles.positionButtonTextSelected,
                ]}
              >
                {position}
              </Text>
            </Pressable>
          ))}
        </View>
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
          style={[
            styles.button,
            styles.submitButton,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? "Saving..." : "Save Player"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  positionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  positionButton: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 8,
    margin: 4,
    minWidth: 50,
    alignItems: "center",
  },
  positionButtonSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  positionButtonText: {
    color: "#374151",
    fontWeight: "500",
  },
  positionButtonTextSelected: {
    color: "white",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 24,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 12,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
  },
  submitButton: {
    backgroundColor: "#2563EB",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  cancelButtonText: {
    color: "#4B5563",
    fontSize: 16,
    fontWeight: "500",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default PlayerForm;
