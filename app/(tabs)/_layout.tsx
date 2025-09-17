import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '../../components/HapticTab';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { useColorScheme } from '../../hooks/useColorScheme.web';

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
          title: 'Trang chủ',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="courses"
        options={{
          title: 'Khoá Học',
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
      <Tabs.Screen
        name="learning/[id]"
        options={{
          // href: null, 
          // headerShown: false,
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}