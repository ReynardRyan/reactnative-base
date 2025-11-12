import React from 'react';
import { View, StyleSheet, ImageBackground, Image, Platform, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
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
import { BackgroundImg, Logo2 } from '../assets/images';
import { wp, hp } from '../utils/responsive';
import { LogoDigiPDAM } from '../assets/images';
import Gap from '../components/Gap';
import colors from '../constants/colors';
import AppButton from '../components/AppButton';
import { Flow } from 'react-native-animated-spinkit';

const schema = z.object({
  username: z.string({ message: 'Username tidak valid' }),
  password: z.string().min(5, { message: 'Minimal 5 karakter' }),
});

type LoginValues = z.infer<typeof schema>;


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
  const [seePassword, setSeePassword] = React.useState(false);
  const [keyboardOffset, setKeyboardOffset] = React.useState(0);

  React.useEffect(() => {
    if (Platform.OS !== 'android') return;
    const showSub = Keyboard.addListener('keyboardDidShow', (e) => setKeyboardOffset(e.endCoordinates.height));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardOffset(0));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

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
    <ImageBackground source={BackgroundImg} style={styles.bg}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.formWrapper}
      >
        <View style={styles.form}>
          <Gap height={hp(4)} />
          <Image source={Logo2} style={styles.logo} />
          <Gap height={hp(5)} />
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
                outlineColor={colors.primary}
                activeOutlineColor={colors.primary}
                left={
                  <TextInput.Icon
                    icon="account"
                    color={focus => (focus ? colors.primary : undefined)}
                  />
                }
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
                secureTextEntry={!seePassword}
                error={!!errors.password}
                mode="outlined"
                outlineColor={colors.primary}
                activeOutlineColor={colors.primary}
                left={
                  <TextInput.Icon
                    icon="lock-open"
                    color={focus => (focus ? colors.primary : undefined)}
                  />
                }
                right={
                  <TextInput.Icon
                    icon={seePassword ? 'eye' : 'eye-off'}
                    onPress={() => setSeePassword(!seePassword)}
                  />
                }
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}
          // Submit button
          <AppButton
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            style={{ marginTop: 12 }}
          >
            {loading ? (
              <>
                <Flow size={40} color={colors.primary} />
              </>
            ) : (
              <Text style={{ color: colors.white }}>Login</Text>
            )}
          </AppButton>
        </View>
      </KeyboardAvoidingView>
      <Image source={LogoDigiPDAM} style={[styles.brand, Platform.OS === 'android' ? { transform: [{ translateY: keyboardOffset }] } : null]} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  formWrapper: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '90%',
    padding: 16,
    gap: 5,
  },
  logo: {
    width: wp(55),
    height: wp(55),
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
  },
  brand: {
    position: 'absolute',
    bottom: 1,
    right: 28,
    width: wp(22),
    height: wp(22),
    resizeMode: 'contain',
    opacity: 0.9,
  },
});