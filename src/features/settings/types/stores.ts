import type { categories } from '../data/categories';

export type PresetMenuStore = {
	isPresetMenuOpen: boolean;
	togglePresetMenu: () => void;
};

export type SettingsModeStore = {
	mode: keyof typeof categories;
	isContentOpen: boolean;
	setMode: (mode: keyof typeof categories) => void;
	toggleContent: (condition: boolean) => void;
};
