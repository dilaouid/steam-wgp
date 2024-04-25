import { create } from 'zustand';
import { IUser } from '../types/IUser';

type AuthStore = {
    isAuthenticated: boolean;
    toggleAuth: (isAuthenticated: boolean) => void;
    user: IUser | null;
    setUser: (user: IUser | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    isAuthenticated: false,
    toggleAuth: (isAuthenticated) => set({ isAuthenticated }),

    user: null,
    setUser: (user) => set({ user })
}));