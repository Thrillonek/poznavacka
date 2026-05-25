import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';

export function tweakRange(num: number, option: 'add' | 'move' = 'move') {
	const updateSettings = useSettingsStore.getState().updateSettings;
	const { min, max } = useSettingsStore.getState().settings.quiz;
	const files = getFiles();

	if (option === 'move') {
		let newMin = Math.max(min + num, 1);
		let newMax = Math.min(max + num, files.length);

		if (Math.abs(newMax - newMin) !== Math.abs(max - min)) return;

		updateSettings('quiz', 'min', newMin);
		updateSettings('quiz', 'max', newMax);
	}
}
