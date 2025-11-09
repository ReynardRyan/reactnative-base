import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login as loginApi, type LoginResponse, type LoginBody } from '../api/endpoints/auth';
import { useAuth } from '../store/useAuth';
import { useNavigation } from '@react-navigation/native';

const schema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Minimal 6 karakter' }),
});

type LoginValues = z.infer<typeof schema>;

type LoginResponse = {
  token: string;
};

export default function LoginScreen() {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
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
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
            error={!!errors.email}
            mode="outlined"
            style={styles.input}
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

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
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {error && <Text style={styles.error}>{error}</Text>}

      <Button mode="contained" onPress={handleSubmit(onSubmit)} disabled={loading}>
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
