import { useSettingsStore } from 'src/data';

/**
 * Handles changing the min and max input values in the settings.
 * @param e - The event that triggered the function.
 * @param option - The option that was changed (either 'min' or 'max').
 */
export function handleChangeMinMax(e, option) {
	const { updateQuizSettings } = useSettingsStore.getState();

	if (isNaN(e.target.value) || e.target.value.length > 3) return;
	updateQuizSettings(option, e.target.value);
}
