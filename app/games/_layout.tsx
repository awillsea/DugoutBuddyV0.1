import { Stack } from 'expo-router';
import { router } from 'expo-router';
export default function GamesLayout() {
  return (
    <Stack screenOptions={{
      headerShown: true,
    }}>
      <Stack.Screen
        name="new"
        options={{
           title: 'New Game',
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          title: 'Game Details',
        }}
      />
      <Stack.Screen
        name="[id]/lineup"
        options={{
          title: 'Game Lineup',
        }}
      />
      <Stack.Screen
        name="[id]/scoring"
        options={{
          title: 'Score Game',
        }}
      />
    </Stack>
  );
}