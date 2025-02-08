// app/teams/[id]/index.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Team } from "@/src/types/team";
import { teamService } from "@/src/services/team/teamService";
import TeamRoster from "@/src/components/teams/TeamRoster";
import PlayerForm from "@/src/components/teams/PlayerForm";

export default function TeamDetailsScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [team, setTeam] = useState<Team | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayerForm, setShowPlayerForm] = useState(false);

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    try {
      const teamData = await teamService.getTeam(id as string);
      if (!teamData) {
        Alert.alert("Error", "Team not found");
        router.back();
        return;
      }
      setTeam(teamData);
    } catch (error) {
      Alert.alert("Error", "Failed to load team");
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPlayer = async (playerData: PlayerCreationData) => {
    try {
      await teamService.addPlayer(team!.id, playerData);
      setShowPlayerForm(false);
      loadTeam(); // Reload team data to get updated roster
    } catch (error) {
      Alert.alert("Error", "Failed to add player");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  if (showPlayerForm) {
    return (
      <PlayerForm
        onSubmit={handleAddPlayer}
        onCancel={() => setShowPlayerForm(false)}
      />
    );
  }

  return (
    <View style={styles.container}>
      <TeamRoster
        players={team?.players || []}
        onAddPlayer={() => setShowPlayerForm(true)}
        onEditPlayer={(player) => {
          // Implement edit player functionality
          console.log("Edit player:", player);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
