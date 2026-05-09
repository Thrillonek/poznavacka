import { usePoznavackaStore } from 'src/data';
import { useFileSystemStore } from 'src/features/file-system/data/stores';
import { getFolderName } from './objectManipulation';

export function isFileInCurrentFolder(filePath: string) {
	const path = useFileSystemStore.getState().path;
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	let poznavackaSuffix = getFolderName(poznavacka!) !== path.at(-1) ? '/' + getFolderName(poznavacka!) : '';
	let searchTerm = path.join('/') + poznavackaSuffix;
	return filePath.includes(searchTerm) && filePath.split(searchTerm)[1].slice(1).indexOf('/') == -1;
}
