import { useSettingsStore } from 'src/data';
import { useQuizFileStore, useQuizRandomIndexStore } from '../data/stores';
import { currentIndex, fileIndexList } from '../data/variables';

/**
 * Shows the previous file in the quiz.
 * If the mode is random, it can only go back one file, then just returns the current file.
 * Otherwise it can go back to the previous file in the cycle infinitely.
 */
export function showPreviousFile() {
	const { setFileIndex } = useQuizFileStore.getState();
	const { shiftIndexes, history } = useQuizRandomIndexStore.getState();
	const settings = useSettingsStore.getState().settings;

	if (settings.quiz.random && history.length > 0) {
		setFileIndex(history[0]);
		shiftIndexes();
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
