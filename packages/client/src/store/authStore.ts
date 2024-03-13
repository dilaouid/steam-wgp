import { create } from 'zustand';

type AuthStore = {
    isAuthenticated: boolean;
    toggleAuth: (isAuthenticated: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    toggleAuth: (isAuthenticated) => set({ isAuthenticated }),
}));