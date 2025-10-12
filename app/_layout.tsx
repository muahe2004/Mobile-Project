import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import 'react-native-reanimated';

import { UserProvider } from '@/contexts/useContextUser';
import { useUserInfo } from '@/hooks/useGetUserInfor';
import { useSocket } from '@/hooks/useSocket';
import { createContext, useEffect } from 'react';
import { useColorScheme } from '../hooks/useColorScheme.web';

export const SocketContext = createContext<any>(null);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')});
  const { user, loading } = useUserInfo();
  const socket = useSocket(user?.id);

  useEffect(() => {
    if (!socket || !user?.id) return;
    socket.emit("registerUser", user.id);
  }, [socket, user?.id]);

  if (!loaded || loading) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <UserProvider>
        <SocketContext.Provider value={socket}>
          <View style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </View>
          <StatusBar style="dark" />
        </SocketContext.Provider>
      </UserProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({});