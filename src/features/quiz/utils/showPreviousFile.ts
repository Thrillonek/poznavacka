import { useSettingsStore } from 'src/data';
import { useQuizFileStore } from '../data/stores';
import { currentIndex, fileIndexList, previousFiles } from '../data/variables';

/**
 * Shows the previous file in the quiz.
 * If the mode is random, it can only go back one file, then just returns the current file.
 * Otherwise it can go back to the previous file in the cycle infinitely.
 */
export function showPreviousFile() {
	const { setFileIndex, fileIndex } = useQuizFileStore.getState();
	const settings = useSettingsStore.getState().settings;

	let isPreviousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	if (settings.quiz.random) {
		if (!(previousFiles.length > 1)) return;
		if (isPreviousAvailable) {
			setFileIndex(previousFiles[0]);
		} else {
			setFileIndex(previousFiles[1]);
		}
	} else {
		let index = currentIndex.current ?? 0;
		function decreaseIndex(index: number) {
			let newIndex = index - 1;
			if (newIndex < 0) newIndex = fileIndexList.main.length - 1;
			currentIndex.current = newIndex;

			if (fileIndexList.main[newIndex] === null) {
				return decreaseIndex(newIndex);
			} else {
				return newIndex;
			}
		}
		index = fileIndexList.main[decreaseIndex(index)]!;
		setFileIndex(index);
	}
}
