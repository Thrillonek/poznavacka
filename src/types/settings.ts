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
		};
		general: {
			removeDuplicates: boolean;
			autoSwitchSettingsMode: boolean;
		};
	};
	setKeybind: (keybind: keyof SettingsStore['settings']['keybinds'], newValue: string) => void;
	setSettings: (newSettings: any) => void;
	updateSettings: <category extends keyof SettingsStore['settings']>(category: category, key: keyof SettingsStore['settings'][category], value: Basic) => void;
};
