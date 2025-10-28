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
	const { fileIndex } = useQuizFileStore.getState();
	const files = getFiles();

	let idx = fileIndexList.recent.indexOf(fileIndex);
	if (idx == -1) idx = fileIndexList.main.indexOf(fileIndex);

	if (fileIndexList.recent.includes(fileIndex)) {
		fileIndexList.recent.splice(idx, 1);
	} else fileIndexList.main.splice(idx, 1);

	storeFileInCompleted(files[fileIndex - 1]);
	changeImage({ complete: true });
}
