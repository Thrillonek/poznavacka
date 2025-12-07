import { create } from 'zustand';
import { type PresetMenuStore, type SettingsModeStore } from '../types/stores';

export const usePresetMenuStore = create<PresetMenuStore>()((set) => ({
	isPresetMenuOpen: false,
	togglePresetMenu: () => set((state) => ({ isPresetMenuOpen: !state.isPresetMenuOpen })),
}));

export const useSettingsModeStore = create<SettingsModeStore>((set) => ({
	mode: 'obecné',
	setMode: (newMode) => set({ mode: newMode }),
}));
