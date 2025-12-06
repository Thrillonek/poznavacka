import type { SettingsStore } from 'src/types/stores';

export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

export type SettingsStatusStore = {
	activeRangeValue?: 'min' | 'max';
	activateRange: (type: 'min' | 'max') => void;
	deactivateRange: () => void;

	keybindToBeChanged?: keyof SettingsStore['settings']['keybinds'];
	startChangingKeybinds: (keybind: string) => void;
	stopChangingKeybinds: () => void;

	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};

export type SettingsModeStore = {
	mode: string;
	setMode: (mode: string) => void;
};
