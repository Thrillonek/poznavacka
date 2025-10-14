import { useCompletedFilesStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useQuizFileStore } from '../data/stores';
import { fileIndexHistory } from '../data/variables';

export function addFileToCompleted() {
	const { addFileToCompleted: storeFileInCompleted } = useCompletedFilesStore.getState();
	const { fileIndex } = useQuizFileStore.getState();
	const files = getFiles();

	let idx = fileIndexHistory.recent.indexOf(fileIndex);
	if (idx == -1) idx = fileIndexHistory.main.indexOf(fileIndex);

	if (fileIndexHistory.recent.includes(fileIndex)) {
		fileIndexHistory.recent.splice(idx, 1);
	} else fileIndexHistory.main.splice(idx, 1);

	storeFileInCompleted(files[fileIndex - 1]);
	changeImage({ show: false, complete: true });
}
