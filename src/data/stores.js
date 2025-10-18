import { create } from 'zustand';

export const useSwipeLockStore = create((set) => ({
	isLocked: false,
	lockSwiping: () => set({ isLocked: true }),
	unlockSwiping: () => set({ isLocked: false }),
}));

export const useModeStore = create((set) => ({
	mode: 'list',
	setMode: (mode) => set({ mode }),
}));

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

export const usePresetStore = create((set) => ({
	presets: [],
	togglePreset: (preset) =>
		set((state) => {
			if (state.presets.includes(preset)) {
				return { presets: state.presets.filter((item) => item != preset) };
			} else {
				return { presets: [...state.presets, preset] };
			}
		}),

	clearPresets: () => set({ presets: [] }),
}));

export const useCompletedFilesStore = create((set) => ({
	completedFiles: [],
	addFileToCompleted: (file) => set((state) => ({ completedFiles: [...state.completedFiles, file] })),
	clearCompletedFiles: () => set({ completedFiles: [] }),
}));
