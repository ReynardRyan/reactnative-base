import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>;

export default function DetailScreen({ route }: Props) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Detail Item #{id}</Text>
      <Text variant="bodyLarge" style={{ marginTop: 8 }}>
        Ini adalah detail dummy untuk item dengan ID {id}.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
});