import type { JSXElementConstructor } from 'react';
import type { Folder } from 'src/types/variables';

export type SwipeLockStore = {
	isLocked: boolean;
	lockSwiping: () => void;
	unlockSwiping: () => void;
};

export type Modes = 'list' | 'quiz' | 'settings';
export type ModeStore = {
	mode: Exclude<Modes, 'settings'>;
	isSettingsOpen: boolean;
	closeSettings: () => void;
	setMode: (mode: Modes) => void;
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
		keybinds: {
			change: string;
			reveal: string;
			complete: string;
		};
		quiz: {
			mode: string;
			random: boolean;
			min: number;
			max: number;
			devMode: boolean;
		};
		list: {
			showFiles: 'all' | 'completed' | 'uncompleted';
		};
		removeDuplicates: boolean;
		autoSwitchSettingsMode: boolean;
	};
	setKeybind: (keybind: keyof SettingsStore['settings']['keybinds'], newValue: string) => void;
	updateQuizSettings: (key: keyof SettingsStore['settings']['quiz'], value: Basic) => void;
	updateCoreSettings: (key: keyof SettingsStore['settings'], value: Basic) => void;
	updateListSettings: (key: keyof SettingsStore['settings']['list'], value: SettingsStore['settings']['list']['showFiles']) => void;
};

export type PresetStore = {
	presets: number[];
	togglePreset: (preset: number, condition?: boolean) => void;
	clearPresets: () => void;
};

export type CompletedFilesStore = {
	completedFiles: string[];
	addFileToCompleted: (file: string) => void;
	removeFileFromCompleted: (file: string) => void;
	clearCompletedFiles: () => void;
};

export type MenuElementStore = {
	isMenuHidden: boolean;
	Element: JSXElementConstructor<any> | null;
	toggleHideMenu: (mode: boolean) => void;
	setElement: (element: JSXElementConstructor<any> | null) => void;
};

export type InformationStore = {
	title: string;
	isVisible: boolean;
	setInformation: (title: string) => void;
	hideInformation: () => void;
};
