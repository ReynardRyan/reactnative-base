import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken as persistToken, clearToken } from '../api/auth';

export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      hydrated: false,
      hydrate: async () => {
        // Persist akan melakukan rehidrasi otomatis; ini no-op agar kompatibel.
        return Promise.resolve();
      },
      login: async (token: string) => {
        await persistToken(token);
        set({ token, isAuthenticated: true });
      },
      logout: async () => {
        await clearToken();
        set({ token: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

// Tandai hydrated setelah persist selesai rehidrasi
useAuth.persist.onFinishHydration(() => {
  useAuth.setState({ hydrated: true });
});
