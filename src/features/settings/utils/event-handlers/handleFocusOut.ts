import { useSettingsStore } from 'src/data';

export function handleFocusOut(files: string[]) {
	const { min, max } = useSettingsStore.getState().settings.quiz;

	const updateSettings = useSettingsStore.getState().updateSettings;
	if (min < 1) updateSettings('quiz', 'min', 1);
	if (max > files.length) updateSettings('quiz', 'max', files.length);
}
