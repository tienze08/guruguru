
import { useFonts } from 'expo-font';
import { Stack, Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {

  useFonts({
    'outfit': require('../../assets/fonts/Outfit-Bold.ttf'),
    'outfit-bold': require('../../assets/fonts/Outfit-Regular.ttf')
  })

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
    </Stack>
  );
}
