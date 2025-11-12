import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Platform } from 'react-native';
import StackInnerOne from '../screens/StackInnerOne';
import StackInnerTwo from '../screens/StackInnerTwo';
import StackInnerThree from '../screens/StackInnerThree';
import colors from '../constants/colors';

export type InnerStackParamList = {
  InnerOne: undefined;
  InnerTwo: { id: number };
  InnerThree: { id: number };
};

const Stack = createNativeStackNavigator<InnerStackParamList>();

export default function StackDemo() {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'none',
        fullScreenGestureEnabled: true,
        gestureEnabled: true,
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      {/* Sembunyikan header pada list agar tidak double dengan header di AppTabs */}
      <Stack.Screen name="InnerOne" component={StackInnerOne} options={{ headerShown: false, title: 'List' }} />
      {/* Biarkan header native tampil pada detail untuk tombol back */}
      <Stack.Screen name="InnerTwo" component={StackInnerTwo} options={{ title: 'Detail', headerStyle: { backgroundColor: colors.primary }, headerTintColor: colors.white, headerTitleStyle: { color: colors.white } }} />
      <Stack.Screen name="InnerThree" component={StackInnerThree} options={{ title: 'Detail Tambahan', headerStyle:{ backgroundColor: colors.primary }, headerTintColor: colors.white, headerTitleStyle: { color: colors.white } }} />
    </Stack.Navigator>
  );
}
