import { useQuizFileStore } from '../data/stores';
import { previousFiles, previousIndex } from '../data/variables';

export function showPreviousFile() {
	const { setFileIndex, fileIndex } = useQuizFileStore.getState();

	let isPreviousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	if (settings.quiz.random) {
		if (!(previousFiles.length > 1)) return;
		if (isPreviousAvailable) {
			setFileIndex(previousFiles[0]);
		} else {
			setFileIndex(previousFiles[1]);
		}
	} else {
		let idx;
		if (previousIndex.current == null || previousIndex.current == 0) {
			idx = fileIndexHistory.main.length - 1;
		} else {
			idx = previousIndex.current - 1;
		}
		previousIndex.current = idx;
		idx = fileIndexHistory.main[idx];
		setFileIndex(idx);
	}
}
