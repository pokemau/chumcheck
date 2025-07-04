import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  login: (token: string) => Promise<void>;
  logout: () => void;
  fetchUser: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user, isAuthenticated: true }),

      setToken: (token) => set({ token }),

      setLoading: (loading) => set({ isLoading: loading }),

      login: async (token: string) => {
        set({ token, isLoading: true });

        try {
          // TODO: LOGINGINGINGIG
          const response = await fetch('/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const user = await response.json();
            set({ user, isAuthenticated: true });
          } else {
            throw new Error('Failed to fetch user');
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ token: null, user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      fetchUser: async () => {
        const { token } = get();
        if (!token) return;

        set({ isLoading: true });

        try {
          const response = await fetch('/users', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.ok) {
            const user = await response.json();
            set({ user, isAuthenticated: true });
          } else {
            // Token might be expired
            set({ token: null, user: null, isAuthenticated: false });
          }
        } catch (error) {
          console.error('Fetch user error:', error);
          set({ token: null, user: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      initializeAuth: async () => {
        const { token, fetchUser } = get();
        if (token) {
          await fetchUser();
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token
      }) // Only persist token
    }
  )
);
