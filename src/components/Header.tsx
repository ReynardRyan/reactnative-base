import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import { Logo3 } from '../assets/images';
import colors from '../constants/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image source={Logo3} style={styles.logo} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>PERUMDAM AVO</Text>
        <Text style={styles.subtitle}>
          PERUSAHAAN UMUM DAERAH AIR MINUM AVO
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.white,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: colors.white,
  },
});
