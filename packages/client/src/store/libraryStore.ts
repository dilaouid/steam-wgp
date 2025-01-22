import { create } from 'zustand';
import { TGameLibrary } from '../core/types/TGameLibrary';

type LibraryStore = {
    library: TGameLibrary[];
    setLibrary: (games: TGameLibrary[]) => void;

    selected: number[];
    setSelected: (selected: number[]) => void;
};

export const useLibraryStore = create<LibraryStore>((set) => ({
    library: [],
    setLibrary: (library) => set({ library }),

    selected: [],
    setSelected: (selected) => set({ selected })
}));