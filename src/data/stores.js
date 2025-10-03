import { removeDuplicateFileNames } from '@/utils/removeDuplicateFileNames';
import { create } from 'zustand';

export const usePoznavackaStore = create((set) => ({
	poznavacka: null,
	basePoznavacka: null,
	setPoznavacka: (p) => set({ basePoznavacka: p }),
	updatePoznavacka: (p) => set({ poznavacka: p }),
}));

export const useSettingsStore = create((set) => ({
	settings: {
		keybinds: {
			change: 'ArrowUp',
			reveal: 'ArrowDown',
			complete: 'ArrowRight',
		},
		quiz: {
			mode: 'custom',
			random: true,
			min: 1,
			max: 10,
			presets: [],
			complete: [],
		},
		list: {
			hideCompleted: false,
		},
		removeDuplicates: false,
		devMode: false,
	},
	setKeybind: (keybind, newValue) => set((state) => ({ settings: { ...state.settings, keybinds: { ...state.settings.keybinds, [keybind]: newValue } } })),
	updateQuizSettings: (key, value) => set((state) => ({ settings: { ...state.settings, quiz: { ...state.settings.quiz, [key]: value } } })),
	updateCoreSettings: (key, value) => set((state) => ({ settings: { ...state.settings, [key]: value } })),
	updateListSettings: (key, value) => set((state) => ({ settings: { ...state.settings, list: { ...state.settings.list, [key]: value } } })),
}));
