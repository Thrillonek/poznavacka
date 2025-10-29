import type { Folder } from 'src/types/variables';

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
	poznavacka: Folder;
	basePoznavacka: Folder;
	setPoznavacka: (newPoznavacka: Folder) => void;
	updatePoznavacka: (newPoznavacka: Folder) => void;
};

type Basic = string | number | boolean;

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
	updateQuizSettings: (key: string, value: Basic) => void;
	updateCoreSettings: (key: string, value: Basic) => void;
	updateListSettings: (key: string, value: Basic) => void;
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
