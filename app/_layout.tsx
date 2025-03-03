import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Thêm cái này
import { SafeAreaProvider } from 'react-native-safe-area-context'; // Đảm bảo an toàn hiển thị trên iOS
import { useColorScheme } from '@/hooks/useColorScheme';
import { UserDetailContext } from './context/userDetailContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();  
  const [fontsLoaded] = useFonts({  
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [userDetail, setUserDetail] = useState(null); 

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="(menu)" options={{ headerShown: false }} />
              <Stack.Screen name="addCourse/index" options={{ headerShown: false }} />
              <Stack.Screen name="chapterView/index" options={{ headerShown: false }} />
              <Stack.Screen name="courseView/index" options={{ headerShown: false }} />
              <Stack.Screen name="quizz/index" options={{ headerShown: false }} />
              <Stack.Screen name="auth/signIn" options={{ headerShown: false }} />
              <Stack.Screen name="auth/signUp" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </UserDetailContext.Provider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
