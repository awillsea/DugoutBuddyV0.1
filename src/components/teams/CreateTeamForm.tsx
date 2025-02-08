// src/components/teams/CreateTeamForm.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { teamService } from "@/src/services/team/teamService";

interface CreateTeamFormProps {
  onSuccess: (teamId: string) => void;
  onCancel: () => void;
}

const CreateTeamForm: React.FC<CreateTeamFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [season, setSeason] = useState(new Date().getFullYear().toString());
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Team name is required");
      return;
    }

    setIsLoading(true);
    try {
      const teamId = await teamService.createTeam({ name, season });
      onSuccess(teamId);
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "Failed to create team",
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          style={[
            styles.button,
            styles.submitButton,
            isLoading && styles.buttonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <Text style={styles.submitButtonText}>
            {isLoading ? "Creating..." : "Create Team"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    margin: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
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
    fontSize: 14,
    fontWeight: "500",
  },
  submitButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default CreateTeamForm;
