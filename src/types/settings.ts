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
		colorPicker: {
			preset: string;
			chroma: number;
			hue: number;
		};
		general: {
			removeDuplicates: boolean;
			autoSwitchSettingsMode: boolean;
		};
	};
	setSettings: (newSettings: any) => void;
	updateSettings: <category extends keyof SettingsStore['settings']>(category: category, key: keyof SettingsStore['settings'][category], value: Basic) => void;
};
