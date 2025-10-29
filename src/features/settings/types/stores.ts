export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

export type SettingsStatusStore = {
	activeRangeValue?: string;
	activateRange: (type: string) => void;
	deactivateRange: () => void;

	keybindToBeChanged?: string;
	startChangingKeybinds: (keybind: string) => void;
	stopChangingKeybinds: () => void;

	isModalOpen: boolean;
	openModal: () => void;
	closeModal: () => void;
};
