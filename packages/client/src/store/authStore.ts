import { create } from 'zustand';

type AuthStore = {
    isAuthenticated: boolean;
    toggleAuth: (isAuthenticated: boolean) => void;
    username?: string | null;
    setUsername: (username: string | null) => void;
    steamderId?: string | null;
    setSteamderId: (steamderId: string | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    toggleAuth: (isAuthenticated) => set({ isAuthenticated }),

    username: null,
    setUsername: (username) => set({ username }),

    steamderId: null,
    setSteamderId: (steamderId) => set({ steamderId }),
}));