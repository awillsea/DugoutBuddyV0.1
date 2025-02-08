// src/components/teams/TeamRoster.tsx
import React from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { Player } from "@/src/types/team";
import { FontAwesome } from "@expo/vector-icons";

interface TeamRosterProps {
  players: Player[];
  onAddPlayer: () => void;
  onEditPlayer: (player: Player) => void;
}

const TeamRoster: React.FC<TeamRosterProps> = ({
  players,
  onAddPlayer,
  onEditPlayer,
}) => {
  const renderPlayer = ({ item }: { item: Player }) => (
    <Pressable style={styles.playerCard} onPress={() => onEditPlayer(item)}>
      <View style={styles.playerInfo}>
        <Text style={styles.playerNumber}>#{item.number}</Text>
        <View>
          <Text style={styles.playerName}>{item.name}</Text>
          <Text style={styles.playerPositions}>
            {item.positions.join(", ")}
          </Text>
        </View>
      </View>
      <FontAwesome name="chevron-right" size={16} color="#9CA3AF" />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Roster</Text>
        <Pressable style={styles.addButton} onPress={onAddPlayer}>
          <FontAwesome name="plus" size={16} color="white" />
          <Text style={styles.addButtonText}>Add Player</Text>
        </Pressable>
      </View>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(player) => player.id}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No players added yet</Text>
            <Pressable style={styles.emptyStateButton} onPress={onAddPlayer}>
              <Text style={styles.emptyStateButtonText}>Add First Player</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    margin: 16,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  playerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  playerNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4B5563",
    marginRight: 12,
    width: 40,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  playerPositions: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 16,
  },
  emptyStateButton: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  emptyStateButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default TeamRoster;
