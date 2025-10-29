import type { ChangeEvent } from 'react';
import { useSettingsStore } from 'src/data';

/**
 * Handles changing the min and max values from the input on page in the settings.
 * @param e - The event that triggered the function.
 * @param option - The option that was changed (either 'min' or 'max').
 */
export function handleChangeMinMax(e: ChangeEvent<HTMLInputElement>, option: 'min' | 'max') {
	const { updateQuizSettings } = useSettingsStore.getState();

	if (/\D/g.test(e.currentTarget.value) || e.currentTarget.value.length > 3) return;
	updateQuizSettings(option, e.currentTarget.value);
}
