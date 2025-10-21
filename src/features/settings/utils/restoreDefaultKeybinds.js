import { useSettingsStore } from 'src/data';
import { defaultKeybinds } from '../data/constants';

/**
 * Restores the default keybinds from the defaultKeybinds object.
 */
export function restoreDefaultKeybinds() {
	const setKeybind = useSettingsStore.getState().setKeybind;

	for (let [key, value] of Object.entries(defaultKeybinds)) {
		setKeybind(key, value);
	}
}
