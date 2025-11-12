import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useCounter } from '../store/useCounter';
import { useUI } from '../store/useUI';
import Config from 'react-native-config';

export default function HomeScreen() {
  const { count, increment, decrement, reset } = useCounter();
  const { setGlobalLoading } = useUI();

  const showLoadingForSeconds = (seconds = 3) => {
    setGlobalLoading(true);
    setTimeout(() => setGlobalLoading(false), seconds * 1000);
  };

  // Contoh varian font yang didukung (pastikan file TTF tersedia)
  const fontSamples = [
    { label: 'SourceSansPro-Regular', family: 'SourceSansPro-Regular' },
    { label: 'SourceSansPro-Semibold', family: 'SourceSansPro-Semibold' },
    { label: 'SourceSansPro-Bold', family: 'SourceSansPro-Bold' },
  ];

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
      <View style={styles.row}>
        <Button mode="contained" onPress={() => showLoadingForSeconds(3)} style={styles.button}>
          Tampilkan Loading 3 detik
        </Button>
      </View>
      <Text>Environment: {Config.ENV}</Text>

      {/* Seksi contoh font */}
      <View style={styles.fontSection}>
        <Text variant="titleMedium">Contoh Font Source Sans Pro</Text>
        {fontSamples.map((s) => (
          <Text key={s.family} style={{ fontFamily: s.family, fontSize: 18 }}>
            {s.label}: The quick brown fox jumps over the lazy dog 0123456789
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
  fontSection: {
    marginTop: 16,
    gap: 8,
  },
});