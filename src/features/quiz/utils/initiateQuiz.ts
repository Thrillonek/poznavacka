import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { fileIndexList, previousIndex } from '../data/variables';
import { getMinMax } from './getMinMax';

/**
 * Prepares the quiz for the change of `poznavacka` variable.
 * Generates a new array of indexes for the quiz, skiping indexes of files that are in the `completedFiles` array.
 * The result depends on selected mode (preset, custom).
 * It also resets `previousIndex` and changes the maximum value of the range.
 *
 * @param resetIndex - Whether to reset `previousIndex` or not.
 */
export function initiateQuiz(resetIndex = true) {
	const settings = useSettingsStore.getState().settings;
	const completedFiles = useCompletedFilesStore.getState().completedFiles;
	const files = getFiles();

	if (resetIndex) {
		previousIndex.current = undefined;
	}

	let { min, max } = getMinMax({ files, settings });

	let range = max - min + 1;

	fileIndexList.recent = [];
	fileIndexList.main = [];

	for (let i = 0; i < range; i++) {
		let val = i + min;
		if (completedFiles?.includes(files[val - 1])) continue;
		fileIndexList.main.push(val);
	}
}
