import { create } from 'zustand';
import { ISteamder } from '../types/ISteamder';

type SteamderStore = {
    steamder: ISteamder | null;
    setSteamder: (games: ISteamder) => void;
};

export const useSteamderStore = create<SteamderStore>((set) => ({
    steamder: null,
    setSteamder: (steamder) => set({ steamder }),
}));