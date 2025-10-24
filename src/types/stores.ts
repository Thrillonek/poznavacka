import type { FileSystem } from 'src/types/variables';

export type SwipeLockStore = {
	isLocked: boolean;
	lockSwiping: () => void;
	unlockSwiping: () => void;
};

export type ModeStore = {
	mode: string;
	setMode: (mode: string) => void;
};

export type PoznavackaStore = {
	poznavacka: FileSystem;
	basePoznavacka: FileSystem;
	setPoznavacka: (newPoznavacka: FileSystem) => void;
	updatePoznavacka: (newPoznavacka: FileSystem) => void;
};

export type SettingsStore = {
	settings: {
		keybinds: { [key: string]: string };
		quiz: {
			mode: string;
			random: boolean;
			min: number;
			max: number;
		};
		list: {
			hideCompleted: boolean;
		};
		removeDuplicates: boolean;
		devMode: boolean;
	};
	setKeybind: (keybind: string, newValue: string) => void;
	updateQuizSettings: (key: string, value: string) => void;
	updateCoreSettings: (key: string, value: string) => void;
	updateListSettings: (key: string, value: string) => void;
};

export type PresetStore = {
	presets: number[];
	togglePreset: (preset: number, condition?: boolean) => void;
	clearPresets: () => void;
};

export type CompletedFilesStore = {
	completedFiles: string[];
	addFileToCompleted: (file: string) => void;
	clearCompletedFiles: () => void;
};
