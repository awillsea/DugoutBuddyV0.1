import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { gameService } from '@/src/services/game/gameService';
import { useTeam } from '@/src/hooks/useTeam';
import { teamService } from '@/src/services/team/teamService';
import { Team } from '@/src/types/team';

export default function NewGameScreen() {
  const { teamId } = useLocalSearchParams();
  const [team, setTeam] = useState<Team | null>(null);
  const { currentTeam } = useTeam();
  const [opponentName, setOpponentName] = useState('');
  const [gameDate, setGameDate] = useState(new Date());
  const [isHome, setIsHome] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  useEffect(() => {
    if (teamId) {
      loadTeam();
    }
  }, [teamId]);

  const loadTeam = async () => {
    try {
      const teamData = await teamService.getTeam(teamId as string);
      setTeam(teamData);
    } catch (error) {
      console.error('Error loading team:', error);
    }
  };
  const handleCreateGame = async () => {
    try {
      if (!currentTeam?.id || !opponentName) return;
      
      await gameService.createGame(currentTeam.id, opponentName, gameDate, isHome);
      router.back();
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule New Game</Text>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Opponent Name"
          value={opponentName}
          onChangeText={setOpponentName}
        />

        <Pressable 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>{gameDate.toLocaleDateString()}</Text>
        </Pressable>

        {showDatePicker && (
          <DateTimePicker
            value={gameDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setGameDate(selectedDate);
              }
            }}
          />
        )}

        <View style={styles.locationButtons}>
          <Pressable
            style={[styles.locationButton, isHome && styles.locationButtonActive]}
            onPress={() => setIsHome(true)}
          >
            <Text style={[styles.locationButtonText, isHome && styles.locationButtonTextActive]}>
              Home
            </Text>
          </Pressable>

          <Pressable
            style={[styles.locationButton, !isHome && styles.locationButtonActive]}
            onPress={() => setIsHome(false)}
          >
            <Text style={[styles.locationButtonText, !isHome && styles.locationButtonTextActive]}>
              Away
            </Text>
          </Pressable>
        </View>

        <Pressable 
          style={[styles.createButton, !opponentName && styles.createButtonDisabled]}
          onPress={handleCreateGame}
          disabled={!opponentName}
        >
          <Text style={styles.createButtonText}>Create Game</Text>
        </Pressable>
      </View>
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
    color: '#111827',
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateButton: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  locationButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  locationButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  locationButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  locationButtonText: {
    color: '#111827',
    fontWeight: '500',
  },
  locationButtonTextActive: {
    color: 'white',
  },
  createButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonDisabled: {
    backgroundColor: '#93c5fd',
  },
  createButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
});