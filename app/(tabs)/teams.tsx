import React, { useState, useEffect } from 'react';
import { 
 View, 
 Text, 
 StyleSheet, 
 FlatList, 
 Pressable, 
 ActivityIndicator 
} from 'react-native';
import { router } from 'expo-router';
import { teamService } from '@/src/services/team/teamService';
import { Team } from '@/src/types/team';
import TeamCard from '@/src/components/teams/TeamCard';

export default function TeamsScreen() {
 const [teams, setTeams] = useState<Team[]>([]);
 const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
 const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
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

 const handleTeamPress = (team: Team) => {
   router.push(`/teams/${team.id}`);
 };

 const handleTeamSelect = (team: Team) => {
  setSelectedTeam(team);
  // Navigate to stats with team ID
  router.push({
    pathname: '/(tabs)/stats',
    params: { teamId: team.id }
  });
};

 const handleNewGame = () => {
   if (!selectedTeam) {
     alert('Please select a team first');
     return;
   }
   router.push({
     pathname: '/games/new',
     params: { teamId: selectedTeam.id }
   });
 };

 if (isLoading) {
   return (
     <View style={styles.container}>
       <ActivityIndicator size="large" color="#2563eb" />
     </View>
   );
 }

 return (
   <View style={styles.container}>
     <View style={styles.header}>
       <Text style={styles.title}>My Teams</Text>
       <Pressable 
         style={styles.addTeamButton}
         onPress={() => router.push('/modal/add-team')}
       >
         <Text style={styles.addTeamButtonText}>Add Team</Text>
       </Pressable>
     </View>

     <FlatList
       data={teams}
       renderItem={({ item }) => (
         <TeamCard 
           team={item}
           isSelected={selectedTeam?.id === item.id}
           onSelect={() => handleTeamSelect(item)}
         />
       )}
       keyExtractor={(item) => item.id}
       contentContainerStyle={styles.listContainer}
       ListEmptyComponent={() => (
         <View style={styles.emptyState}>
           <Text style={styles.emptyStateText}>No teams yet</Text>
           <Pressable 
             style={styles.createTeamButton}
             onPress={() => router.push('/modal/add-team')}
           >
             <Text style={styles.createTeamButtonText}>Create Team</Text>
           </Pressable>
         </View>
       )}
     />
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f3f4f6',
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
 title: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#111827',
 },
 addTeamButton: {
   backgroundColor: '#2563eb',
   paddingHorizontal: 12,
   paddingVertical: 8,
   borderRadius: 8,
 },
 addTeamButtonText: {
   color: 'white',
   fontWeight: '500',
 },
 listContainer: {
   padding: 16,
 },
 emptyState: {
   padding: 32,
   alignItems: 'center',
 },
 emptyStateText: {
   fontSize: 16,
   color: '#6b7280',
   marginBottom: 16,
 },
 createTeamButton: {
   backgroundColor: '#2563eb',
   padding: 12,
   borderRadius: 8,
 },
 createTeamButtonText: {
   color: 'white',
   fontSize: 16,
   fontWeight: '500',
 }
});