import { create } from 'zustand';

export const usePresetMenuStore = create((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));
