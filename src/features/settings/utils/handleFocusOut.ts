import { useSettingsStore } from 'src/data/stores';

export function handleFocusOut(files: string[]) {
	const { min, max } = useSettingsStore.getState().settings.quiz;

	const updateQuizSettings = useSettingsStore.getState().updateQuizSettings;
	if (min < 1) updateQuizSettings('min', 1);
	if (max > files.length) updateQuizSettings('max', files.length);
}
