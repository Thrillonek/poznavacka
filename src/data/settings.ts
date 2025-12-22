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
		removeDuplicates: false,
		autoSwitchSettingsMode: false,
	},
	setKeybind: (keybind, newValue) => set((state) => ({ settings: { ...state.settings, keybinds: { ...state.settings.keybinds, [keybind]: newValue } } })),
	updateQuizSettings: (key, value) => set((state) => ({ settings: { ...state.settings, quiz: { ...state.settings.quiz, [key]: value } } })),
	updateCoreSettings: (key, value) => set((state) => ({ settings: { ...state.settings, [key]: value } })),
	updateListSettings: (key, value) => set((state) => ({ settings: { ...state.settings, list: { ...state.settings.list, [key]: value } } })),
	setSettings: (newSettings) => set({ settings: newSettings }),
}));
