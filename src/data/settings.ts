import type { SettingsStore } from 'src/types/settings';
import { create } from 'zustand';

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
		},
		general: {
			removeDuplicates: false,
			autoSwitchSettingsMode: false,
		},
	},
	setKeybind: (keybind, newValue) => set((state) => ({ settings: { ...state.settings, keybinds: { ...state.settings.keybinds, [keybind]: newValue } } })),
	setSettings: (newSettings) => set({ settings: newSettings }),
	updateSettings: (category, key, value) =>
		set((state) => {
			return { settings: { ...state.settings, [category]: { ...state.settings[category], [key]: value } } };
		}),
}));
