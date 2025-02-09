import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

export default function GameDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Game Details Screen</Text>
      <Text style={styles.text}>Game ID: {id}</Text>
      
      <Pressable
        style={styles.button}
        onPress={() => {
          console.log('Navigating to lineup');
          router.push(`/games/${id}/lineup`);
        }}
      >
        <Text style={styles.buttonText}>Go to Lineup</Text>
      </Pressable>
    </View>
  );
}const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    text: {
      fontSize: 18,
      marginBottom: 16,
    },
    button: {
      backgroundColor: '#2563eb',
      padding: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });