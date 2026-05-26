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
	} else if (option === 'add') {
		let newMax = Math.min(max + num, files.length);

		let filesLengthRounded = Math.floor(files.length / 10) * 10;

		if (max === files.length && filesLengthRounded !== files.length && files.length + num <= filesLengthRounded) {
			newMax = filesLengthRounded;
		}

		if (newMax < min) return;

		updateSettings('quiz', 'max', newMax);
	}
}
