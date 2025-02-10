import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { useAuth } from '@/src/context/AuthContext';
import { Redirect } from 'expo-router';

export default function TabLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="games"
        options={{
          title: 'Games/index',
          tabBarIcon: ({ color }) => <FontAwesome name="gamepad" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color }) => <FontAwesome name="bar-chart" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="teams"
        options={{
          title: 'Teams',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}