import { create } from 'zustand';

export const useMenuStore = create((set) => ({
	isOpened: false,
	open: () => set({ isOpened: true }),
	close: () => set({ isOpened: false }),
	toggle: () => set((state) => ({ isOpened: !state.isOpened })),
}));
