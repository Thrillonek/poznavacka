import { useSettingsStore } from 'src/data';
import type { SettingsStore } from 'src/types/settings';
import { defaultKeybinds } from '../data/constants';

/**
 * Restores the default keybinds from the defaultKeybinds object.
 */
export function restoreDefaultKeybinds() {
	const updateSettings = useSettingsStore.getState().updateSettings;

	for (let [key, value] of Object.entries(defaultKeybinds)) {
		updateSettings('keybinds', key as keyof SettingsStore['settings']['keybinds'], value);
	}
}
