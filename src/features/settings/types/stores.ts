export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

type SettingsModes = 'obecné' | 'kvíz' | 'seznam' | 'klávesové zkratky';
export type SettingsModeStore = {
	mode: SettingsModes;
	setMode: (mode: SettingsModes) => void;
};
