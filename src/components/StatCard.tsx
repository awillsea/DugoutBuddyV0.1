// src/components/StatCard.tsx
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  style?: ViewStyle;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  style 
}: StatCardProps) {
  const getTrendColor = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return '#059669'; // green-600
      case 'down':
        return '#DC2626'; // red-600
      default:
        return '#4B5563'; // gray-600
    }
  };

  const getTrendIcon = (direction: 'up' | 'down' | 'neutral') => {
    switch (direction) {
      case 'up':
        return 'trending-up';
      case 'down':
        return 'trending-down';
      default:
        return 'trending-neutral';
    }
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        {/* <MaterialCommunityIcons name={icon} size={24} color="#4B5563" /> */}
        <Text style={styles.value}>{value}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      
      {trend && (
        <View style={styles.trendContainer}>
          <MaterialCommunityIcons 
            name={getTrendIcon(trend.direction)} 
            size={16} 
            color={getTrendColor(trend.direction)} 
          />
          <Text style={[
            styles.trendText,
            { color: getTrendColor(trend.direction) }
          ]}>
            {trend.value}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    color: '#4B5563', // gray-600
    marginTop: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  trendText: {
    marginLeft: 4,
  },
});