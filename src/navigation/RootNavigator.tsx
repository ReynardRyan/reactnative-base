import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppTabs from './AppTabs';
import AuthStack from './AuthStack';
import type { RootStackParamList } from './types';
import { useAuth } from '../store/useAuth';
import colors from '../constants/colors';
import Header from '../components/Header';
import DetailScreen from '../screens/Detail';

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
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        animation: 'none',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Root" component={AppTabs} options={{ header: () => <Header /> }} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </>
      ) : (
        <Stack.Screen name="Login" component={AuthStack} options={{ headerShown: false }} />
      )}
    </Stack.Navigator>
  );
}
