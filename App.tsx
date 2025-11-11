import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import { useAuth } from './src/store/useAuth';
import RootNavigator from './src/navigation/RootNavigator';
// import ToastHost from './src/components/ToastHost';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { hydrate, hydrated } = useAuth();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  function Splash() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Memuat...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            {hydrated ? <RootNavigator /> : <Splash />}
          </NavigationContainer>
          {/* <ToastHost /> */}
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
