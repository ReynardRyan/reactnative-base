import React from 'react';
import { StatusBar, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import {
  Provider as PaperProvider,
  Text,
  ActivityIndicator,
  MD3LightTheme,
} from 'react-native-paper';
import { useAuth } from './src/store/useAuth';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
import { Root as PopupRootProvider } from '@sekizlipenguen/react-native-popup-confirm-toast';
import { GlobalLoading } from './src/components/Loading';

const theme = {
  ...MD3LightTheme,
  fonts: MD3LightTheme.fonts,
};

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
    <PopupRootProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <PaperProvider theme={theme}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <NavigationContainer>
              {hydrated ? <RootNavigator /> : <Splash />}
            </NavigationContainer>
            {/* Global Loading Overlay */}
            <GlobalLoading />
            {/* Global Toast Host */}
            <Toast />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </PopupRootProvider>
  );
}

export default App;
