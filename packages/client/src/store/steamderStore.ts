import { create } from 'zustand';
import { ISteamder } from '../types/ISteamder';

type SteamderStore = {
    steamder: ISteamder | null;
    isShuffled: boolean;
    setSteamder: (games: ISteamder | null) => void;
    shuffleGames: () => void; 
};

export const useSteamderStore = create<SteamderStore>((set, get) => ({
    steamder: null,
    isShuffled: false,
    setSteamder: (steamder) => set({ steamder }),
    shuffleGames: () => {
        const { steamder, isShuffled } = get()
        if (steamder && !isShuffled) {
          const property = steamder.display_all_games ? 'all_games' : 'common_games';
          set({
            steamder: {
              ...steamder,
              [property]: steamder[property].sort(() => Math.random() - 0.5),
            },
            isShuffled: true
          });
        }
      },
    
}));