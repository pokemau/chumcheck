import { create } from 'zustand';

export const useUserStore = create<{
  role: string | null;
  setRole: (role: string) => void;
}>((set) => ({
  role: null,
  setRole: (role) => set({ role })
}));
