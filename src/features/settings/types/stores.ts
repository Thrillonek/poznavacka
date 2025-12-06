export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

export type SettingsStatusStore = {
	activeRangeValue?: 'min' | 'max';
	activateRange: (type: 'min' | 'max') => void;
	deactivateRange: () => void;

	keybindToBeChanged?: string;
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
