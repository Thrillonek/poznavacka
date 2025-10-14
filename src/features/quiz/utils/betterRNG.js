import { useSettingsStore } from 'src/data';
import { fileIndexHistory } from '../data/variables';

export function betterRNG(minVal, maxVal) {
	const settings = useSettingsStore.getState().settings;

	const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	let range = maxVal - minVal + 1;
	let idx = rng(0, fileIndexHistory.main.length - 1);
	let result = fileIndexHistory.main[idx];

	fileIndexHistory.recent.push(result);
	fileIndexHistory.main.splice(idx, 1);

	let multiplier = range >= 5 ? 1.33 : 1;
	if (Math.floor((range - settings.quiz.complete.length) / multiplier) <= fileIndexHistory.recent.length) {
		fileIndexHistory.main.push(fileIndexHistory.recent[0]);
		fileIndexHistory.recent.shift();
	}

	return result;
}
