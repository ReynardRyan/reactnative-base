import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  login as loginApi,
  type LoginResponse,
  type LoginBody,
} from '../api/endpoints/auth';
import { useAuth } from '../store/useAuth';
import { useNavigation } from '@react-navigation/native';
import { toastSuccess, toastError } from '../components/toast';
import { showPopupMessage } from '../components/popup';

const schema = z.object({
  username: z.string({ message: 'Username tidak valid' }),
  password: z.string().min(5, { message: 'Minimal 5 karakter' }),
});

type LoginValues = z.infer<typeof schema>;

type LoginResponse = {
  token: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: '', password: '' },
  });
  const navigation = useNavigation<any>();
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginApi(values as LoginBody);
      await login(res.token);
      toastSuccess('Login berhasil');
      // Redirect ke Home (Tab Root)
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    } catch (e: any) {
      const msg = e?.message ?? 'Login gagal';
      setError(msg);
      showPopupMessage('Gagal Masuk', msg, 'danger', 'Tutup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Masuk</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Username"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            error={!!errors.username}
            mode="outlined"
          />
        )}
      />
      {errors.username && (
        <Text style={styles.errorText}>{errors.username.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
            style={styles.input}
            error={!!errors.password}
            mode="outlined"
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        style={{ marginTop: 12 }}
      >
        {loading ? 'Memproses...' : 'Masuk'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  input: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
  },
});
