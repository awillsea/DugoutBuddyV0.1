// app/teams/[id]/index.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import TeamCard from '@/src/components/teams/TeamCard';
import { Team } from '../../../src/types/team';
import { teamService } from '../../../src/services/team/teamService';

export default function TeamDetailScreen() {
  const { id } = useLocalSearchParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadTeam();
  }, [id]);

  const loadTeam = async () => {
    if (!id) {
      Alert.alert('Error', 'Team ID is missing');
      router.back();
      return;
    }

    try {
      const teamData = await teamService.getTeam(id as string);
      if (!teamData) {
        Alert.alert('Error', 'Team not found');
        router.back();
        return;
      }
      setTeam(teamData);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to load team');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlayer = () => {
    // Will implement in next step
    Alert.alert('Coming Soon', 'Add player functionality will be available soon!');
  };

  const handleEditTeam = () => {
    // Will implement in next step
    Alert.alert('Coming Soon', 'Edit team functionality will be available soon!');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Loading team details...</Text>
      </View>
    );
  }

  if (!team) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Team not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <FontAwesome name="arrow-left" size={20} color="#4b5563" />
          <Text style={styles.backButtonText}>Back</Text>
        </Pressable>
        <Pressable style={styles.editButton} onPress={handleEditTeam}>
          <FontAwesome name="edit" size={20} color="#4b5563" />
        </Pressable>
      </View>

      {/* Team Info */}
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.seasonText}>Season: {team.season}</Text>
      </View>

      {/* Players Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Players</Text>
          <Pressable style={styles.addButton} onPress={handleAddPlayer}>
            <FontAwesome name="plus" size={16} color="white" />
            <Text style={styles.addButtonText}>Add Player</Text>
          </Pressable>
        </View>

        {team.players.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No players added yet</Text>
          </View>
        ) : (
          <View style={styles.playersList}>
            {team.players.map(player => (
              <View key={player.id} style={styles.playerCard}>
                <View>
                  <Text style={styles.playerName}>{player.name}</Text>
                  <Text style={styles.playerNumber}>#{player.number}</Text>
                </View>
                <Text style={styles.playerPosition}>{player.positions.join(', ')}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4b5563',
  },
  editButton: {
    padding: 8,
  },
  teamInfo: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  teamName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  seasonText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  section: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
  },
  playersList: {
    padding: 16,
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  playerNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  playerPosition: {
    fontSize: 14,
    color: '#4b5563',
  },
});