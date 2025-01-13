import { create } from 'zustand';
import { TGameLibrary } from '../core/types/TGameLibrary';

type LibraryStore = {
    library: TGameLibrary[];
    setLibrary: (games: TGameLibrary[]) => void;

    selected: string[];
    setSelected: (selected: string[]) => void;
};

export const useLibraryStore = create<LibraryStore>((set) => ({
    library: [],
    setLibrary: (data) =>
        set({
          library: data.sort((a, b) => a.game_id.localeCompare(b.game_id)), // Tri par ordre ascendant
        }),

    selected: [],
    setSelected: (selected) => set({ selected })
}));