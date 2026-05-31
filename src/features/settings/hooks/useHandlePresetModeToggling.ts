import { useEffect } from 'react';
import { usePresetStore, useSettingsStore } from 'src/data';
import { usePresetMenuStore } from '../data/stores';

/**
 * Handles the toggling of preset and custom mode in the settings panel.
 * If the preset menu is open and some presets selected, it sets the mode to 'preset'.
 * Otherwise, it sets the mode to 'custom'.
 */
export function useHandlePresetModeToggling() {
	const presets = usePresetStore((store) => store.presets);
	const isPresetMenuOpen = usePresetMenuStore((store) => store.isPresetMenuOpen);
	const updateSettings = useSettingsStore((store) => store.updateSettings);
	const settings = useSettingsStore((store) => store.settings);

	useEffect(() => {
		if (presets.length > 0 && isPresetMenuOpen) {
			if (settings.quiz.mode != 'preset') updateSettings('quiz', 'mode', 'preset');
		} else {
			if (settings.quiz.mode != 'custom') updateSettings('quiz', 'mode', 'custom');
		}
	}, [presets.length, isPresetMenuOpen, settings.quiz.mode]);
}
