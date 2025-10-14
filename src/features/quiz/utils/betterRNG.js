import { useSettingsStore } from 'src/data';
import { fileHistory } from '../data/variables';

export function betterRNG(minVal, maxVal) {
	const settings = useSettingsStore.getState().settings;

	const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	let range = maxVal - minVal + 1;
	let idx = rng(0, fileHistory.main.length - 1);
	let result = fileHistory.main[idx];

	fileHistory.recent.push(result);
	fileHistory.main.splice(idx, 1);

	let multiplier = range >= 5 ? 1.33 : 1;
	if (Math.floor((range - settings.quiz.complete.length) / multiplier) <= fileHistory.recent.length) {
		fileHistory.main.push(fileHistory.recent[0]);
		fileHistory.recent.shift();
	}

	return result;
}
