// app/team-select.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '@/src/context/AuthContext';
import { teamService } from '@/src/services/team/teamService';
import { Team } from '@/src/types/team';

export default function TeamSelectScreen() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const userTeams = await teamService.getUserTeams();
      setTeams(userTeams);
      
      // If user has only one team, automatically select it
      if (userTeams.length === 1) {
        handleTeamSelect(userTeams[0]);
      }
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTeamSelect = (team: Team) => {
    // Store selected team in local storage or context
    // You might want to create a TeamContext for this
    router.replace('/(tabs)');
  };

  const handleCreateTeam = () => {
    router.push('/create-team');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Your Team</Text>
      
      {teams.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>You don't have any teams yet</Text>
          <Pressable style={styles.button} onPress={handleCreateTeam}>
            <Text style={styles.buttonText}>Create Team</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={teams}
          renderItem={({ item }) => (
            <Pressable
              style={styles.teamCard}
              onPress={() => handleTeamSelect(item)}
            >
              <Text style={styles.teamName}>{item.name}</Text>
              <Text style={styles.teamSeason}>{item.season}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666',
  },
  button: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  teamCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
  },
  teamSeason: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});