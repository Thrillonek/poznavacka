export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

export type SettingsModeStore = {
	mode: string;
	setMode: (mode: string) => void;
};
