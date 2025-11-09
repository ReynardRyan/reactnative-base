import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useToast } from '../store/useToast';

export default function ToastHost() {
  const { current, dismiss } = useToast((s) => ({ current: s.current, dismiss: s.dismiss }));
  const [visible, setVisible] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (current) {
      setVisible(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      const duration = current.duration ?? 3000;
      timerRef.current = setTimeout(() => {
        setVisible(false);
        dismiss();
      }, duration);
    } else {
      setVisible(false);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [current, dismiss]);

  const onDismiss = () => {
    setVisible(false);
    // Give a small delay to allow Snackbar animation
    setTimeout(() => dismiss(), 150);
  };

  return (
    <View pointerEvents="box-none" style={styles.container}>
      <Snackbar
        visible={!!current && visible}
        onDismiss={onDismiss}
        duration={current?.duration ?? 3000}
        style={[
          styles.snackbar,
          current?.kind === 'success' && styles.success,
          current?.kind === 'error' && styles.error,
        ]}
      >
        {current?.message ?? ''}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  snackbar: {},
  success: { backgroundColor: '#2e7d32' },
  error: { backgroundColor: '#c62828' },
});
