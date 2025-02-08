// src/components/teams/TeamCard.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Team } from "@/src/types/team";
import { router } from "expo-router";

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <Pressable
      style={styles.container}
      onPress={() => router.push(`/teams/${team.id}`)}
    >
      <View style={styles.header}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.season}>{team.season}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  season: {
    fontSize: 14,
    color: "#6B7280",
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingTop: 12,
  },
  statsItem: {
    alignItems: "center",
  },
  statsLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
});

export default TeamCard;
