import { create } from 'zustand';

export type UIState = {
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  globalLoading: false,
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
}));
