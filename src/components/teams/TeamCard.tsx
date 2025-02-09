// src/components/teams/TeamCard.tsx

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Team } from '../../types/team';

interface TeamCardProps {
  team: Team;
  isSelected?: boolean;
  onSelect?: (teamId: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onSelect,isSelected }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed, isSelected && styles.cardSelected]}
      onPress={() => onSelect?.(team.id)}
    >
      <View style={styles.header}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.season}>Season: {team.season}</Text>
      </View>

      <View style={styles.playerCount}>
      <FontAwesome name="users" size={20} color="#4b5563" />
        <Text style={styles.playerCountText}>{team.players.length} Players</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
    cardSelected: {
        borderColor: '#2563eb',
        borderWidth: 2,
      },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPressed: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  season: {
    fontSize: 14,
    color: '#6b7280',
  },
  playerCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerCountText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#4b5563',
  },
});

export default TeamCard;