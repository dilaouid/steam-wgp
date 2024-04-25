import { create } from 'zustand';
import { TGameLibrary } from '../types/TGameLibrary';

type LibraryStore = {
    library: TGameLibrary[];
    setLibrary: (games: TGameLibrary[]) => void;

    selected: string[];
    setSelected: (selected: string[]) => void;
};

export const useLibraryStore = create<LibraryStore>((set) => ({
    library: [],
    setLibrary: (library) => set({ library }),

    selected: [],
    setSelected: (selected) => set({ selected })
}));