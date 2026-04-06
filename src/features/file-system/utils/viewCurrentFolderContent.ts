import { usePoznavackaStore } from 'src/data';
import { getContent, isObject } from 'src/utils';
import { useFileSystemStore, useMenuStore } from '../data/stores';
import { fileSystemGoBack } from './fileSystemGoBack';

export function viewCurrentFolderContent() {
	const closeMenu = useMenuStore.getState().close;
	const selectedFolder = useFileSystemStore.getState().selectedFolder;
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	if (poznavacka && getContent(poznavacka) !== selectedFolder.filter((f) => !isObject(f))) {
		fileSystemGoBack(true);
	}
	closeMenu();
}
