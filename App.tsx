import React from 'react';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Provider as PaperProvider,
  Text,
  Button,
  TextInput,
  ActivityIndicator,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useCounter } from './src/store/useCounter';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from './src/store/useAuth';
import LoginScreen from './src/screens/Login';
import ProfileScreen from './src/screens/Profile';
import ToastHost from './src/components/ToastHost';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function HomeScreen() {
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
    </View>
  );
}

const formSchema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Minimal 6 karakter' }),
});

type FormValues = z.infer<typeof formSchema>;

function FormScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form submit:', data);
  };

  return (
    <View style={styles.screenContainer}>
      <Text variant="titleMedium">Form Contoh</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            mode="outlined"
            autoCapitalize="none"
            keyboardType="email-address"
            error={!!errors.email}
            style={styles.input}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
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
            mode="outlined"
            secureTextEntry
            error={!!errors.password}
            style={styles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.submitButton}
      >
        Submit
      </Button>
    </View>
  );
}

function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'Home' ? 'home' : 'account';
          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="Profile" component={ProfileScreen} />
    </Tabs.Navigator>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const { hydrate, hydrated, isAuthenticated } = useAuth();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  function Splash() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Memuat...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            {hydrated ? (
              isAuthenticated ? (
                <Stack.Navigator>
                  <Stack.Screen
                    name="Root"
                    component={TabNavigator}
                    options={{ headerShown: false }}
                  />
                </Stack.Navigator>
              ) : (
                <Stack.Navigator>
                  <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Masuk' }} />
                </Stack.Navigator>
              )
            ) : (
              <Splash />
            )}
          </NavigationContainer>
          <ToastHost />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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
  input: {
    marginTop: 8,
  },
  errorText: {
    color: 'red',
  },
  submitButton: {
    marginTop: 16,
  },
});

export default App;
