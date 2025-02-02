// app/(tabs)/teams.tsx
import { View, Text, TouchableOpacity, ScrollView,StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Later we'll move this to a proper types file
type Team = {
  id: string;
  name: string;
  playerCount: number;
  nextGame?: string;
};

// Temporary mock data - later this will come from your backend
const mockTeams: Team[] = [
  { id: '1', name: 'Thunder', playerCount: 12, nextGame: 'vs Lightning, Sun 2pm' },
  { id: '2', name: 'Hurricanes', playerCount: 15, nextGame: 'vs Cyclones, Sat 4pm' },
];
const styles = StyleSheet.create({ // Create a StyleSheet object
  container: {
    flex: 1,
    backgroundColor: 'gray', // Use backgroundColor, not bg-red-50
  },
  scrollView: {
    flex: 1,
  },
  teamCard: {
    backgroundColor: 'white',
    margin: 16, // Use margin, not m-4 (16 is a good default for m-4)
    padding: 16, // Use padding, not p-4
    borderRadius: 8, // Use borderRadius, not rounded-lg
    shadowColor: '#000', // Shadow properties
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  teamContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerCount: {
    color: 'red',
  },
  nextGame: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 16, // Use consistent spacing
    right: 16,
    backgroundColor: 'blue',
    width: 56, // Use consistent sizing
    height: 56,
    borderRadius: 28, // Half of width/height for a circle
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
export default function TeamsScreen() {
  const router = useRouter();

  const handleAddTeam = () => {
    router.push('/modal/add-team');
  };

  const handleTeamPress = (teamId: string) => {
    // We'll implement this route later
    // router.push(`/teams/${teamId}`);
  };

  return (
    <View style={styles.container}> 
      <ScrollView style={styles.scrollView}>
        {mockTeams.map((team) => (
          <TouchableOpacity
            key={team.id}
            style={styles.teamCard} 
            onPress={() => handleTeamPress(team.id)}
          >
            <View style={styles.teamContent}> 
              <View>
                <Text style={styles.teamName}>{team.name}</Text> 
                <Text style={styles.playerCount}>{team.playerCount} players</Text> 
                {team.nextGame && (
                  <Text style={styles.nextGame}>{team.nextGame}</Text> 
                )}
              </View>
              <MaterialCommunityIcons name="chevron-right" size={24} color="#af9ca3" />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTeam}> 
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}