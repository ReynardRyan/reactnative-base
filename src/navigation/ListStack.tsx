import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import colors from '../constants/colors';
import ListScreen from '../screens/List';
import DetailScreen from '../screens/Detail';

export type ListStackParamList = {
  ListIndex: undefined;
  Detail: { id: number };
};

const Stack = createNativeStackNavigator<ListStackParamList>();

export default function ListStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { color: colors.white },
        animation: 'none',
        fullScreenGestureEnabled: true,
        gestureEnabled: true,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name="ListIndex" component={ListScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail' }} />
    </Stack.Navigator>
  );
}
