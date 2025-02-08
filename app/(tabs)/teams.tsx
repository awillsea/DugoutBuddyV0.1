// app/(tabs)/teams.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { auth } from '@/src/config/firebase';
import { Team } from '@/src/types/team';
import { teamService } from '@/src/services/team/teamService';
import CreateTeamForm from '@/src/components/teams/CreateTeamForm';
import TeamCard from '@/src/components/teams/TeamCard';

export default function TeamsScreen() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) {
      router.replace('/auth/login');
      return;
    }
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const userTeams = await teamService.getUserTeams();
      setTeams(userTeams);
    } catch (error) {
      console.error('Error loading teams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTeamCreated = async (teamId: string) => {
    setShowCreateForm(false);
    await loadTeams();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Teams</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => setShowCreateForm(true)}
        >
          <Text style={styles.addButtonText}>New Team</Text>
        </Pressable>
      </View>

      {showCreateForm && (
        <CreateTeamForm
          onSuccess={handleTeamCreated}
          onCancel={() => setShowCreateForm(false)}
        />
      )}

      <View style={styles.teamsList}>
        {teams.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              You haven't created any teams yet
            </Text>
          </View>
        ) : (
          teams.map(team => (
            <TeamCard key={team.id} team={team} />
          ))
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  teamsList: {
    padding: 16,
  },
  emptyState: {
    padding: 32,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});