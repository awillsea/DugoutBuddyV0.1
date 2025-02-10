import { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Team } from '@/src/types/team';
import { teamService } from '@/src/services/team/teamService';

export default function StatsScreen() {
 const [activeTab, setActiveTab] = useState<'team' | 'players'>('team');
 const [team, setTeam] = useState<Team | null>(null);
 const [isLoading, setIsLoading] = useState(true);
 const { teamId } = useLocalSearchParams();

 useEffect(() => {
  loadTeamData();
}, [teamId]);

const loadTeamData = async () => {
  if (!teamId) return;
  try {
    const teamData = await teamService.getTeam(teamId as string);
    setTeam(teamData);
  } catch (error) {
    console.error('Error loading team:', error);
  } finally {
    setIsLoading(false);
  }
};

 const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: string }) => (
   <View style={styles.statCard}>
     <View style={styles.statCardContent}>
       <MaterialCommunityIcons name={icon as any} size={24} color="#4B5563" />
       <Text style={styles.statValue}>{value}</Text>
     </View>
     <Text style={styles.statCardTitle}>{title}</Text>
   </View>
 );

 const TeamStatsView = () => (
   <ScrollView>
     <View style={styles.statRow}>
       <StatCard 
         title="Win %" 
         value={`${team?.stats?.winningPercentage || 0}%`} 
         icon="trophy" 
       />
       <StatCard 
         title="Runs/Game" 
         value={(team?.stats?.runsScored || 0).toFixed(1)} 
         icon="baseball-bat" 
       />
     </View>

     <View style={styles.chartContainer}>
       <Text style={styles.sectionTitle}>Season Summary</Text>
       <View>
         <Text style={styles.summaryItem}>
           Record: {team?.stats?.wins || 0}W - {team?.stats?.losses || 0}L
         </Text>
         <Text style={styles.summaryItem}>
           Runs Scored: {team?.stats?.runsScored || 0}
         </Text>
         <Text style={styles.summaryItem}>
           Runs Allowed: {team?.stats?.runsAllowed || 0}
         </Text>
       </View>
     </View>
   </ScrollView>
 );

 const PlayerStatsView = () => (
   <ScrollView>
     <View style={styles.chartContainer}>
       <Text style={styles.sectionTitle}>Batting Leaders</Text>
       <View>
         {team?.players.map((player, index) => (
           <TouchableOpacity key={player.id} style={styles.playerItem}>
             <Text style={styles.playerName}>{player.name}</Text>
             <View style={styles.playerDetails}>
               <Text style={styles.playerText}>
                 AVG: {player.stats.battingAverage.toFixed(3)}
               </Text>
               <Text style={styles.playerText}>
                 Hits: {player.stats.hits}
               </Text>
               <Text style={styles.playerText}>
                 RBI: {player.stats.rbis}
               </Text>
             </View>
           </TouchableOpacity>
         ))}
       </View>
     </View>
   </ScrollView>
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
       <Text style={styles.teamName}>{team?.name || 'Team Stats'}</Text>
     </View>
     
     <View style={styles.tabBar}>
       <TouchableOpacity
         style={[styles.tabButton, activeTab === 'team' && styles.activeTab]}
         onPress={() => setActiveTab('team')}
       >
         <Text style={[
           styles.tabText, 
           activeTab === 'team' ? styles.activeTabText : styles.inactiveTabText
         ]}>
           Team Stats
         </Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={[styles.tabButton, activeTab === 'players' && styles.activeTab]}
         onPress={() => setActiveTab('players')}
       >
         <Text style={[
           styles.tabText,
           activeTab === 'players' ? styles.activeTabText : styles.inactiveTabText
         ]}>
           Player Stats
         </Text>
       </TouchableOpacity>
     </View>

     {activeTab === 'team' ? <TeamStatsView /> : <PlayerStatsView />}
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#f4f4f4',
 },
 loadingContainer: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 header: {
   padding: 16,
   backgroundColor: 'white',
   borderBottomWidth: 1,
   borderBottomColor: '#e5e7eb',
 },
 teamName: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#111827',
 },
 tabBar: {
   flexDirection: 'row',
   borderBottomWidth: 1,
   borderBottomColor: '#e0e0e0',
   backgroundColor: 'white',
 },
 tabButton: {
   flex: 1,
   padding: 16,
   alignItems: 'center',
 },
 tabText: {
   fontWeight: '600',
 },
 activeTab: {
   borderBottomWidth: 2,
   borderBottomColor: '#2563eb',
 },
 activeTabText: {
   color: '#2563eb',
 },
 inactiveTabText: {
   color: '#6b7280',
 },
 statRow: {
   flexDirection: 'row',
   padding: 16,
   gap: 16,
 },
 statCard: {
   flex: 1,
   backgroundColor: 'white',
   padding: 16,
   borderRadius: 8,
   elevation: 2,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
 },
 statCardContent: {
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   marginBottom: 8,
 },
 statValue: {
   fontSize: 20,
   fontWeight: 'bold',
   color: '#111827',
 },
 statCardTitle: {
   color: '#6b7280',
   fontSize: 14,
 },
 chartContainer: {
   backgroundColor: 'white',
   margin: 16,
   padding: 16,
   borderRadius: 8,
   elevation: 2,
   shadowColor: '#000',
   shadowOffset: { width: 0, height: 2 },
   shadowOpacity: 0.1,
   shadowRadius: 4,
 },
 sectionTitle: {
   fontSize: 18,
   fontWeight: 'bold',
   color: '#111827',
   marginBottom: 16,
 },
 summaryItem: {
   color: '#2563eb',
   marginBottom: 8,
   fontSize: 16,
 },
 playerItem: {
   borderBottomWidth: 1,
   borderBottomColor: '#e5e7eb',
   paddingVertical: 12,
 },
 playerName: {
   fontSize: 16,
   fontWeight: '500',
   color: '#111827',
   marginBottom: 4,
 },
 playerDetails: {
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 playerText: {
   color: '#6b7280',
   fontSize: 14,
 },
});