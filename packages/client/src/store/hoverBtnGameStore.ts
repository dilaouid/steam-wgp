import { create } from 'zustand';

type BtnGameStore = {
    hoverLike: boolean;
    setHoverLike: (hoverLike: boolean) => void;

    hoverPass: boolean;
    setHoverPass: (hoverPass: boolean) => void;
};

export const useBtnGameStore = create<BtnGameStore>((set) => ({
    hoverLike: false,
    setHoverLike: (hoverLike) => set({ hoverLike }),

    hoverPass: false,
    setHoverPass: (hoverPass) => set({ hoverPass })
}));