// app/(tabs)/games/index.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { gameService } from "@/src/services/game/gameService";
import { Game } from "@/src/types/game";
import { formatDate } from "@/src/utils/dateUtils";
import { useTeam } from '@/src/hooks/useTeam';

export default function GamesScreen() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentTeam } = useTeam();
  
  useEffect(() => {
    if (currentTeam?.id) {
      loadGames();
    }
  }, [currentTeam]);

  const loadGames = async () => {
    try {
      if (!currentTeam?.id) return;
      const teamGames = await gameService.getTeamGames(currentTeam.id);
      setGames(teamGames);
    } catch (error) {
      console.error("Error loading games:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderGameItem = ({ item }: { item: Game }) => (
    <Pressable
      style={styles.gameCard}
      onPress={() => router.push(`/games/${item.id}`)}
    >
      <View style={styles.gameHeader}>
        <Text style={styles.dateText}>{formatDate(item.date)}</Text>
        <Text style={styles.statusTag}>{item.status}</Text>
      </View>

      <View style={styles.scoreContainer}>
        <View style={styles.teamScore}>
          <Text style={styles.teamName}>Your Team</Text>
          <Text style={styles.scoreText}>{item.score.team}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.teamScore}>
          <Text style={styles.teamName}>{item.opponentName}</Text>
          <Text style={styles.scoreText}>{item.score.opponent}</Text>
        </View>
      </View>
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Games</Text>
        <Pressable
          style={styles.newGameButton}
          onPress={() => router.push("/games/new")}
        >
          <Text style={styles.newGameButtonText}>New Game</Text>
        </Pressable>
      </View>

      <FlatList
        data={games}
        renderItem={renderGameItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No games scheduled</Text>
          </View>
        )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  newGameButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newGameButtonText: {
    color: "white",
    fontWeight: "500",
  },
  listContainer: {
    padding: 16,
  },
  gameCard: {
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
  gameHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusTag: {
    fontSize: 12,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: "#4b5563",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  teamScore: {
    alignItems: "center",
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
  },
  vsText: {
    fontSize: 16,
    color: "#6b7280",
    marginHorizontal: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
});
