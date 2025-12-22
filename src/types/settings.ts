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
		removeDuplicates: boolean;
		autoSwitchSettingsMode: boolean;
	};
	setKeybind: (keybind: keyof SettingsStore['settings']['keybinds'], newValue: string) => void;
	updateQuizSettings: (key: keyof SettingsStore['settings']['quiz'], value: Basic) => void;
	updateCoreSettings: (key: keyof SettingsStore['settings'], value: Basic) => void;
	updateListSettings: (key: keyof SettingsStore['settings']['list'], value: SettingsStore['settings']['list']['showFiles']) => void;
	setSettings: (newSettings: any) => void;
};
