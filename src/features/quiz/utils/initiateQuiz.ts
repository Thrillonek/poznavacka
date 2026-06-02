import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useQuizRandomIndexStore } from '../data/stores';
import { currentIndex, fileIndexList } from '../data/variables';
import { betterRNG } from './betterRNG';
import { getMinMax } from './getMinMax';

/**
 * Prepares the quiz for the change of `poznavacka` variable.
 * Generates a new array of indexes for the quiz, skiping indexes of files that are in the `completedFiles` array.
 * The result depends on selected mode (preset, custom).
 * It also resets `currentIndex` and changes the maximum value of the range.
 *
 * @param resetIndex - Whether to reset `currentIndex` or not.
 * @param clearCompleted - Whether to clear the `completedFiles` array or not.
 */
export function initiateQuiz(resetIndex = true, clearCompleted = false) {
	const settings = useSettingsStore.getState().settings;
	const { completedFiles, removeFileFromCompleted } = useCompletedFilesStore.getState();
	const files = getFiles();
	const { populate } = useQuizRandomIndexStore.getState();

	if (resetIndex) {
		currentIndex.current = undefined;
	}

	let { min, max } = getMinMax({ files, settings });

	let range = max - min + 1;

	fileIndexList.recent = [];
	fileIndexList.main = [];

	for (let i = 0; i < range; i++) {
		let val: number | null = i + min;
		if (completedFiles?.includes(files[val - 1])) {
			if (clearCompleted) {
				removeFileFromCompleted(files[val - 1]);
			} else {
				val = null;
			}
		}
		fileIndexList.main.push(val);
	}

	let newIndexes = Array.from({ length: 6 }, () => betterRNG(min, max));
	populate(newIndexes);
}
