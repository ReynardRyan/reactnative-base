import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/Home';
import ProfileScreen from '../screens/Profile';
import type { AppTabsParamList } from './types';
import colors from '../constants/colors';
import ListScreen from '../screens/List';

const Tabs = createBottomTabNavigator<AppTabsParamList>();

export default function AppTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Home' ? 'home' : route.name === 'Profile' ? 'account' : 'view-list';
          return <Icon name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#B4B4B4',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderColor: '#D1D1D1FF',
          borderWidth: 0.1,
          borderTopWidth: 0.2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.6,
          shadowRadius: 10,
          elevation: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        sceneContainerStyle: { backgroundColor: 'white' },
      })}
    >
      <Tabs.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: 'Beranda' }}
      />
      <Tabs.Screen
        name="List"
        component={ListScreen}
        options={{ tabBarLabel: 'Pelanggan' }}
      />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tabs.Navigator>
  );
}
