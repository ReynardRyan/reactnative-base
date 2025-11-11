import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useCounter } from '../store/useCounter';
import Config from 'react-native-config';

export default function HomeScreen() {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <View style={styles.screenContainer}>
      <Text variant="headlineMedium">Counter: {count}</Text>
      <View style={styles.row}>
        <Button mode="contained" onPress={increment} style={styles.button}>
          Tambah
        </Button>
        <Button mode="contained" onPress={decrement} style={styles.button}>
          Kurangi
        </Button>
        <Button mode="outlined" onPress={reset} style={styles.button}>
          Reset
        </Button>
      </View>
      <Text>Environment: {Config.ENV}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
});
