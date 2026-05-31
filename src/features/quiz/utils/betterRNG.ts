import { useCompletedFilesStore } from 'src/data';
import { fileIndexList } from '../data/variables';

/**
 * Generates a semi-random number between min and max.
 * Makes sure, that files do not repeat often using fileIndexList object.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 */
export function betterRNG(min: number, max: number) {
	const { completedFiles } = useCompletedFilesStore.getState();

	const rng = (minNum: number, maxNum: number) => Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

	let range = max - min + 1;
	let idx = rng(0, fileIndexList.main.length - 1);
	let result = fileIndexList.main[idx];

	while (result === null) {
		idx++;
		result = fileIndexList.main[idx % fileIndexList.main.length];
	}

	fileIndexList.recent.push(result);
	fileIndexList.main.splice(idx, 1);

	let multiplier = range >= 5 ? 1.33 : 1;
	if (Math.floor((range - completedFiles.length) / multiplier) <= fileIndexList.recent.filter((v) => v !== null).length) {
		let nextNum = fileIndexList.recent.filter((v) => v !== null)[0];
		fileIndexList.main.push(nextNum);
		fileIndexList.recent.splice(fileIndexList.recent.indexOf(nextNum), 1);
	}

	return result;
}
