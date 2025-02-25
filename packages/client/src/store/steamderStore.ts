import { create } from 'zustand';
import { ISteamder } from '@core/types/ISteamder';

type SteamderStore = {
    steamder: ISteamder | null;
    setSteamder: (games: ISteamder | null) => void;
};

export const useSteamderStore = create<SteamderStore>((set) => ({
    steamder: null,
    setSteamder: (steamder) => set({ steamder }),
}));