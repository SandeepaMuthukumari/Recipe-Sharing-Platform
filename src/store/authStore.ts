
import { create } from 'zustand';
import { AuthState, User } from '@/types';
import { authAPI } from '@/lib/api';
import { toast } from 'sonner';

export const useAuthStore = create<AuthState & {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await authAPI.login(email, password);
      authAPI.setCurrentUser(user);
      set({ user, isAuthenticated: true, loading: false });
      toast.success(`Welcome back, ${user.username}!`);
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Login failed" });
      toast.error("Login failed. Please check your credentials.");
    }
  },
  
  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await authAPI.register(username, email, password);
      authAPI.setCurrentUser(user);
      set({ user, isAuthenticated: true, loading: false });
      toast.success("Account created successfully!");
    } catch (error) {
      set({ loading: false, error: error instanceof Error ? error.message : "Registration failed" });
      toast.error(error instanceof Error ? error.message : "Registration failed");
    }
  },
  
  logout: () => {
    authAPI.setCurrentUser(null);
    set({ user: null, isAuthenticated: false });
    toast.info("You have been logged out");
  },
  
  checkAuth: () => {
    const user = authAPI.getCurrentUser();
    if (user) {
      set({ user, isAuthenticated: true });
    }
  }
}));
