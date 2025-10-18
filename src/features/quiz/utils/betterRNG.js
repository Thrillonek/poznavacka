import { useCompletedFilesStore } from 'src/data';
import { fileIndexList } from '../data/variables';

export function betterRNG(minVal, maxVal) {
	const { completedFiles } = useCompletedFilesStore.getState();

	const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	let range = maxVal - minVal + 1;
	let idx = rng(0, fileIndexList.main.length - 1);
	let result = fileIndexList.main[idx];

	fileIndexList.recent.push(result);
	fileIndexList.main.splice(idx, 1);

	let multiplier = range >= 5 ? 1.33 : 1;
	if (Math.floor((range - completedFiles.length) / multiplier) <= fileIndexList.recent.length) {
		fileIndexList.main.push(fileIndexList.recent[0]);
		fileIndexList.recent.shift();
	}

	return result;
}
