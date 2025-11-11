import React from 'react';
import { Modal, View, Text, StyleSheet, Pressable } from 'react-native';
import {
  Plane,
  Chase,
  Bounce,
  Wave,
  Pulse,
  Flow,
  Swing,
  Circle,
  CircleFade,
  Grid,
  Fold,
  Wander,
} from 'react-native-animated-spinkit';

export type SpinnerType =
  | 'Plane'
  | 'Chase'
  | 'Bounce'
  | 'Wave'
  | 'Pulse'
  | 'Flow'
  | 'Swing'
  | 'Circle'
  | 'CircleFade'
  | 'Grid'
  | 'Fold'
  | 'Wander';

export type LoadingProps = {
  visible?: boolean;
  message?: string;
  spinnerType?: SpinnerType;
  size?: number;
  color?: string;
  overlayColor?: string;
  dismissOnPress?: boolean;
  onDismiss?: () => void;
};

function getSpinnerComponent(type: SpinnerType) {
  switch (type) {
    case 'Plane':
      return Plane;
    case 'Chase':
      return Chase;
    case 'Bounce':
      return Bounce;
    case 'Wave':
      return Wave;
    case 'Pulse':
      return Pulse;
    case 'Flow':
      return Flow;
    case 'Swing':
      return Swing;
    case 'Circle':
      return Circle;
    case 'CircleFade':
      return CircleFade;
    case 'Grid':
      return Grid;
    case 'Fold':
      return Fold;
    case 'Wander':
      return Wander;
    default:
      return CircleFade;
  }
}

export function Loading({
  visible = false,
  message,
  spinnerType = 'CircleFade',
  size = 48,
  color = '#000',
  overlayColor = 'rgba(0,0,0,0.25)',
  dismissOnPress = false,
  onDismiss,
}: LoadingProps) {
  const Spinner = getSpinnerComponent(spinnerType);

  if (!visible) return null;

  return (
    <Modal visible transparent animationType="fade">
      <Pressable
        style={[styles.overlay, { backgroundColor: overlayColor }]}
        onPress={dismissOnPress ? onDismiss : undefined}
      >
        <View style={styles.container}>
          <Spinner size={size} color={color} />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </Pressable>
    </Modal>
  );
}

// Global binding with Zustand store
import { useUI } from '../store/useUI';
export function GlobalLoading() {
  const { globalLoading } = useUI();
  return <Loading visible={globalLoading} message="Memuat..." spinnerType="Chase" />;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    minWidth: 140,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  message: {
    marginTop: 8,
    fontSize: 14,
    color: '#333',
  },
});
