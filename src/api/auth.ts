import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@auth/token';
let memoryToken: string | null = null;

export async function getToken(): Promise<string | null> {
  if (memoryToken !== null) return memoryToken;
  const stored = await AsyncStorage.getItem(TOKEN_KEY);
  memoryToken = stored;
  return stored;
}

export async function setToken(token: string | null): Promise<void> {
  memoryToken = token;
  if (token) {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } else {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
}

export async function clearToken(): Promise<void> {
  memoryToken = null;
  await AsyncStorage.removeItem(TOKEN_KEY);
}
