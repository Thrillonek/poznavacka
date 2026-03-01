import { create } from 'zustand';
import { type PresetMenuStore } from '../types/stores';

export const usePresetMenuStore = create<PresetMenuStore>()((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));
