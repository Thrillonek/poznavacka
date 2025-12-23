export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

export type SettingsModes = 'obecné' | 'kvíz' | 'seznam' | 'klávesové zkratky' | 'vzhled';
export type SettingsModeStore = {
	mode: SettingsModes;
	isContentOpen: boolean;
	setMode: (mode: SettingsModes) => void;
	toggleContent: (condition: boolean) => void;
};
