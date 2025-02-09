// app/games/[id]/lineup.tsx
import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Game } from '@/src/types/game';
import { gameService } from '@/src/services/game/gameService';

interface Player {
  id: string;
  name: string;
  position: string;
  battingOrder: number;
}

export default function LineupScreen() {
  const { id } = useLocalSearchParams();
  const [lineup, setLineup] = useState<Player[]>([]);
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLineup();
  }, [id]);
  const loadGame = async () => {
    try {
      // Implement loading game and lineup
      const gameData = await gameService.getGame(id as string);
      setGame(gameData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading game:', error);
      setIsLoading(false);
    }
  };

  const loadLineup = async () => {
    // Implement lineup loading logic
  };

  const updateLineup = async (newLineup: Player[]) => {
    // Implement lineup update logic
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={lineup}
        renderItem={({ item, drag, isActive }) => (
          <Pressable
            onLongPress={drag}
            style={[
              styles.playerItem,
              { backgroundColor: isActive ? '#E8E8E8' : '#FFFFFF' }
            ]}
          >
            <Text style={styles.orderNumber}>{item.battingOrder}</Text>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{item.name}</Text>
              <Text style={styles.position}>{item.position}</Text>
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => updateLineup(data)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  playerItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 16,
    width: 30,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  position: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});