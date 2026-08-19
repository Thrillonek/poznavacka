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

	const nullFilter = (x: any) => x !== null;

	let setLength = range - completedFiles.length;
	let halfSetLength = Math.floor(setLength / 2);

	fileIndexList.recent.push(result);
	fileIndexList.main.splice(idx, 1);

	if (fileIndexList.main.filter(nullFilter).length === 0) {
		fileIndexList.main = fileIndexList.recent.filter(nullFilter).slice(0, halfSetLength);
		fileIndexList.recent = fileIndexList.recent.filter(nullFilter).slice(halfSetLength);
	}

	return result;
}
