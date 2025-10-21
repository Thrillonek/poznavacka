import { useSettingsStore } from 'src/data';

export function handleChangeMinMax(e, option) {
	const { updateQuizSettings } = useSettingsStore.getState();

	if (isNaN(e.target.value) || e.target.value.length > 3) return;
	updateQuizSettings(option, e.target.value);
}
