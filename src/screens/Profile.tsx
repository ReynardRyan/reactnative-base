import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useAuth } from '../store/useAuth';

export default function ProfileScreen() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Profile</Text>
      <Text>STATUS: {isAuthenticated ? 'Authenticated' : 'Guest'}</Text>

      <Button mode="contained" onPress={logout} style={styles.button}>
        Keluar Akun
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  button: { marginTop: 12 },
});
