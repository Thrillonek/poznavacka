import type { CompletedFilesStore, ModeStore, PoznavackaStore, PresetStore, SettingsStore, SwipeLockStore } from 'src/types/stores';
import { create } from 'zustand';

export const useSwipeLockStore = create<SwipeLockStore>()((set) => ({
	isLocked: false,
	lockSwiping: () => set({ isLocked: true }),
	unlockSwiping: () => set({ isLocked: false }),
}));

export const useModeStore = create<ModeStore>()((set) => ({
	mode: 'list',
	setMode: (mode: string) => set({ mode }),
}));

export const usePoznavackaStore = create<PoznavackaStore>()((set) => ({
	poznavacka: null,
	basePoznavacka: null,
	setPoznavacka: (newPoznavacka) => set({ basePoznavacka: newPoznavacka }),
	updatePoznavacka: (newPoznavacka) => set({ poznavacka: newPoznavacka }),
}));

export const useSettingsStore = create<SettingsStore>()((set) => ({
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

export const usePresetStore = create<PresetStore>()((set) => ({
	presets: [],
	togglePreset: (preset, condition) =>
		set((state) => {
			if ((state.presets.includes(preset) && condition == undefined) || condition) {
				return { presets: state.presets.filter((item) => item != preset) };
			} else {
				return { presets: [...state.presets, preset] };
			}
		}),

	clearPresets: () => set({ presets: [] }),
}));

export const useCompletedFilesStore = create<CompletedFilesStore>()((set) => ({
	completedFiles: [],
	addFileToCompleted: (file) => set((state: any) => ({ completedFiles: [...state.completedFiles, file] })),
	clearCompletedFiles: () => set({ completedFiles: [] }),
}));
