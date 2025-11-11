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

const schema = z.object({
  username: z.string({ message: 'Username tidak valid' }),
  password: z.string().min(5, { message: 'Minimal 6 karakter' }),
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
      console.log('test');

      const res = await loginApi(values as LoginBody);
      console.log(res);

      await login(res.token);
      // Redirect ke Home (Tab Root)
      navigation.reset({ index: 0, routes: [{ name: 'Root' }] });
    } catch (e: any) {
      setError(e?.message ?? 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall">Masuk</Text>

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
            style={styles.input}
          />
        )}
      />
      {errors.username && (
        <Text style={styles.error}>{errors.username.message}</Text>
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
            error={!!errors.password}
            mode="outlined"
            style={styles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        {loading ? 'Memproses...' : 'Masuk'}
      </Button>

      {loading && <ActivityIndicator style={{ marginTop: 12 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 16 },
  input: { marginTop: 8 },
  error: { color: 'red' },
});
