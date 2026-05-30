import { useCompletedFilesStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useQuizFileStore } from '../data/stores';
import { fileIndexList } from '../data/variables';
import { changeImage } from './changeImage';

/**
 * Adds file to completed files array in global state, removes it from cycle, then changes the image.
 */
export function addFileToCompleted() {
	const { addFileToCompleted: storeFileInCompleted } = useCompletedFilesStore.getState();
	const fileIndex = useQuizFileStore.getState().fileIndex!;
	const files = getFiles();

	let idx = fileIndexList.recent.indexOf(fileIndex);
	if (idx == -1) idx = fileIndexList.main.indexOf(fileIndex);

	if (fileIndexList.recent.includes(fileIndex)) {
		fileIndexList.recent[idx] = null;
	} else fileIndexList.main[idx] = null;

	storeFileInCompleted(files[fileIndex - 1]);
	changeImage();
}
