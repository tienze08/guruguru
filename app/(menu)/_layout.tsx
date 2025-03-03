import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {

  useFonts({
    'outfit': require('../../assets/fonts/Outfit-Bold.ttf'),
    'outfit-bold': require('../../assets/fonts/Outfit-Regular.ttf')
  })

  return (
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name='home' options={{
            tabBarIcon: ({color, size}) => <Ionicons name="home-outline" size={size} color={color} />,
            tabBarLabel: 'Home'
        }}/>
        <Tabs.Screen name='explore' options={{
            tabBarIcon: ({color, size}) => <Ionicons name="search-outline" size={size} color={color} />,
            tabBarLabel: 'Explore'
        }}/>
        <Tabs.Screen name='progress' options={{
            tabBarIcon: ({color, size}) => <Ionicons name="analytics-outline" size={size} color={color} />,
            tabBarLabel: 'Progress'
        }}/>
        <Tabs.Screen name='profile' options={{
            tabBarIcon: ({color, size}) => <Ionicons name="person-circle-outline" size={size} color={color} />,
            tabBarLabel: 'Profile'
        }}/>
      </Tabs>
  );
} 