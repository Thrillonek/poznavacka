import type { SettingsStore } from 'src/types/settings';
import { create } from 'zustand';

//PRESERVE SETTINGS HOOK ONLY WORKS IF SETTINGS ARE DIVIDED INTO CATEGORIES AND EACH CATEGORY HAS PROPERTIES ONLY DIRECTLY INSIDE IT
export const useSettingsStore = create<SettingsStore>()((set) => ({
	settings: {
		keybinds: {
			change: 'ArrowUp',
			reveal: 'ArrowDown',
			complete: 'ArrowRight',
		},
		quiz: {
			mode: 'custom',
			random: false,
			min: 1,
			max: 10,
			devMode: false,
		},
		list: {
			showFiles: 'all',
		},
		colorPicker: {
			preset: 'dark',
			chroma: 0,
			hue: 0,
		},
		general: {
			removeDuplicates: false,
			autoSwitchSettingsMode: false,
		},
	},
	setSettings: (newSettings) => set({ settings: newSettings }),
	updateSettings: (category, key, value) =>
		set((state) => {
			return { settings: { ...state.settings, [category]: { ...state.settings[category], [key]: value } } };
		}),
}));
