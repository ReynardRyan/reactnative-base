import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
import type { RootStackParamList } from './types';
import { useAuth } from '../store/useAuth';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Splash() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
      <Text style={{ marginTop: 8 }}>Memuat...</Text>
    </View>
  );
}

export default function RootNavigator() {
  const { hydrate, hydrated, isAuthenticated } = useAuth();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!hydrated) return <Splash />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Root" component={AppTabs} />
      ) : (
        <Stack.Screen name="Login" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
