import { useSettingsStore } from 'src/data';
import { useQuizFileStore } from '../data/stores';
import { fileIndexList, previousFiles, previousIndex } from '../data/variables';

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
		let idx;
		if (previousIndex.current == null || previousIndex.current == 0) {
			idx = fileIndexList.main.length - 1;
		} else {
			idx = previousIndex.current - 1;
		}
		previousIndex.current = idx;
		idx = fileIndexList.main[idx];
		setFileIndex(idx);
	}
}
