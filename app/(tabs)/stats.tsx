import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'; // Import StyleSheet
import React from "react";
import { LineChart, BarChart } from 'react-native-gifted-charts'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const mockTeamStats = {
  wins: 7,
  losses: 3,
  winPercentage: 70,
  runsScored: 85,
  runsAllowed: 65,
  lastGames: [
    { game: 1, runs: 8 },
    { game: 2, runs: 12 },
    { game: 3, runs: 6 },
    { game: 4, runs: 9 },
    { game: 5, runs: 7 }
  ]
};

const mockPlayerStats = [
  { 
    name: "Mike Johnson",
    atBats: 32,
    hits: 14,
    avg: .438,
    rbi: 12,
    runs: 10
  },
  { 
    name: "Sarah Smith",
    atBats: 28,
    hits: 11,
    avg: .393,
    rbi: 8,
    runs: 9
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4', 
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    padding: 16,
    alignItems: 'center', 
  },
  tabText: {
    fontWeight: 'semibold',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'blue',
  },
  activeTabText: {
    color: 'blue',
  },
  inactiveTabText: {
    color: 'gray',
  },
  statCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    flex: 1, 
    marginHorizontal: 8, 
    marginBottom: 16, 
  },
  statCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statCardTitle: {
    color: 'gray',
    marginTop: 4,
  },
  chartContainer: {
    backgroundColor: 'white',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryItem: {
    color: 'blue',
    marginBottom: 4, 
  },
  playerItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 16,
  },
  playerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  playerText: {
    color: 'gray',
  },
});


export default function StatsScreen() {
  const [activeTab, setActiveTab] = useState<'team' | 'players'>('team');
  const screenWidth = Dimensions.get('window').width;

  const StatCard = ({ title, value, icon }: { title: string, value: string | number, icon: string }) => (
    <View style={styles.statCard}>
      <View style={styles.statCardContent}>
      <MaterialCommunityIcons name="baseball" size={24} color="#4B5563" />
      <Text style={styles.statCardContent}>{value}</Text> 
      </View>
      <Text style={styles.statCardTitle}>{title}</Text>
      </View>
  );

  const TeamStatsView = () => (
    <ScrollView>
      <View style={{ flexDirection: 'row', padding: 16 }}> 
        <StatCard title="Win %" value={`${mockTeamStats.winPercentage}%`} icon="trophy" />
        <StatCard title="Runs/Game" value={(mockTeamStats.runsScored / 10).toFixed(1)} icon="baseball-bat" />
      </View>
  
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Runs Per Game</Text>
      </View>
  
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Season Summary</Text>
        <View>
          <Text style={styles.summaryItem}>Record: {mockTeamStats.wins}W - {mockTeamStats.losses}L</Text>
          <Text style={styles.summaryItem}>Runs Scored: {mockTeamStats.runsScored}</Text>
          <Text style={styles.summaryItem}>Runs Allowed: {mockTeamStats.runsAllowed}</Text>
        </View>
      </View>
    </ScrollView>
  );

  const PlayerStatsView = () => (
    <ScrollView >
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Batting Leaders</Text>
        <View>
          {mockPlayerStats.map((player, index) => (
            <TouchableOpacity key={index} style={styles.playerItem}>
              <Text >{player.name}</Text>
              <View style={styles.playerDetails}>
                <Text style={styles.playerText}>AVG: {player.avg}</Text>
                <Text style={styles.playerText}>Hits: {player.hits}</Text>
                <Text style={styles.playerText}>RBI: {player.rbi}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
  
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Team Batting Average</Text>
      </View>
    </ScrollView>
  );
  
     
  return (
    <View style={styles.container}>
    <View style={styles.tabBar}>
      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'team' && styles.activeTab]}
        onPress={() => setActiveTab('team')}
      >
        <Text style={[styles.tabText, activeTab === 'team' ? styles.activeTabText : styles.inactiveTabText]}>
          Team Stats
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tabButton, activeTab === 'players' && styles.activeTab]}
        onPress={() => setActiveTab('players')}
      >
        <Text style={[styles.tabText, activeTab === 'players' ? styles.activeTabText : styles.inactiveTabText]}>
          Player Stats
        </Text>
      </TouchableOpacity>
    </View>

    {activeTab === 'team' ? <TeamStatsView /> : <PlayerStatsView />}
  </View>
);
}