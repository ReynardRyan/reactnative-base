import { create } from 'zustand';

export type ToastKind = 'default' | 'success' | 'error';

export type ToastItem = {
  id: string;
  message: string;
  kind?: ToastKind;
  duration?: number; // ms
};

export type ToastState = {
  queue: ToastItem[];
  current: ToastItem | null;
  show: (message: string, options?: Partial<ToastItem>) => void;
  success: (message: string, options?: Partial<ToastItem>) => void;
  error: (message: string, options?: Partial<ToastItem>) => void;
  dismiss: () => void;
  clear: () => void;
};

function createId() {
  return Math.random().toString(36).slice(2);
}

export const useToast = create<ToastState>((set, get) => ({
  queue: [],
  current: null,
  show: (message, options) => {
    const item: ToastItem = {
      id: createId(),
      message,
      kind: options?.kind ?? 'default',
      duration: options?.duration ?? 3000,
    };
    const state = get();
    if (!state.current) {
      set({ current: item });
    } else {
      set({ queue: [...state.queue, item] });
    }
  },
  success: (message, options) => get().show(message, { ...options, kind: 'success' }),
  error: (message, options) => get().show(message, { ...options, kind: 'error' }),
  dismiss: () => {
    const state = get();
    if (state.queue.length > 0) {
      const [next, ...rest] = state.queue;
      set({ current: next, queue: rest });
    } else {
      set({ current: null });
    }
  },
  clear: () => set({ queue: [], current: null }),
}));
