import { create } from 'zustand';
import { type PresetMenuStore, type SettingsModeStore } from '../types/stores';

export const usePresetMenuStore = create<PresetMenuStore>()((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));

export const useSettingsModeStore = create<SettingsModeStore>((set) => ({
	mode: 'obecné',
	isContentOpen: false,
	setMode: (newMode) => set({ mode: newMode, isContentOpen: true }),
	toggleContent: (condition) => set((state) => (condition != undefined ? { isContentOpen: condition } : { isContentOpen: !state.isContentOpen })),
}));
