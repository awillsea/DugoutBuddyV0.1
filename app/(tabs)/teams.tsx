// app/(tabs)/teams.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import CreateTeamForm from '../../src/components/teams/CreateTeamForm';
import { useEffect } from 'react';
import { auth } from '../../src/config/firebase';
import { useRouter } from 'expo-router';


export default function TeamsScreen() {
  const router = useRouter();
  useEffect(() => {
    if (!auth.currentUser) {
      // Redirect to login if not authenticated
      router.replace('/auth/login');
    }
  }, []);
  const [showCreateForm, setShowCreateForm] = useState(false);

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
          onSuccess={(teamId) => {
            console.log('Team created:', teamId);
            setShowCreateForm(false);
          }}
          onCancel={() => setShowCreateForm(false)}
        />
      )}
    </ScrollView>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});