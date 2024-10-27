import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { View, Button } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // État pour le thème

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <View style={{ flex: 1 }}>
      <Button title="Toggle Theme" onPress={toggleTheme} /> {/* Bouton pour changer de thème */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[theme ?? 'light'].tabIconSelected,
          tabBarStyle: {
            backgroundColor: Colors[theme ?? 'light'].background, // Change le fond des tabs ici
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Accueil',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Liste de courses',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'basket' : 'basket-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="todolist"
          options={{
            title: 'To-Do Liste',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'list' : 'list-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="test"
          options={{
            title: 'Test',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
