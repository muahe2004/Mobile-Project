import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { useColorScheme } from '@/app/hooks/useColorScheme';
import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: [
          Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
          {
            backgroundColor: "#343D60",
          },  
        ] 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Courses',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="book.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="course-details/[id]"
        options={{
          href: null, 
          headerShown: false,
        }}
      />
    </Tabs>
  );
}