import { shuffleArray } from 'src/utils/general/shuffleArray';
import { useListFilesStore } from '../data/stores';

export function shuffleListFiles() {
	const listFiles = useListFilesStore.getState().files;
	const setListFiles = useListFilesStore.getState().setFiles;

	let listFilesEntries = Array.from(listFiles.entries());
	let newListFiles = new Map<number, string>(shuffleArray(listFilesEntries));
	setListFiles(newListFiles);
}
