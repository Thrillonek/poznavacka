import { useSettingsStore } from 'src/data';

export function restoreDefaultKeybinds() {
	const setKeybind = useSettingsStore.getState().setKeybind;

	for (let [key, value] of Object.entries(defaultKeybinds)) {
		setKeybind(key, value);
	}
}
