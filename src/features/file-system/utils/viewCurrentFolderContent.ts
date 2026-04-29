import { usePoznavackaStore } from 'src/data';
import { getContent, isObject } from 'src/utils';
import { useFileSystemStore, useMenuStore, useSelectMultipleStore } from '../data/stores';
import { fileSystemGoBack } from './fileSystemGoBack';
import { toggleSet } from './selectMultipleFunctionMutators';

export function viewCurrentFolderContent() {
	const closeMenu = useMenuStore.getState().close;

	const selectedFolder = useFileSystemStore.getState().selectedFolder;
	const folderName = useFileSystemStore.getState().folderName;

	const poznavacka = usePoznavackaStore.getState().poznavacka;

	const isSelecting = useSelectMultipleStore.getState().isSelecting;

	if (isSelecting) {
		toggleSet({ [folderName || 'Poznávačky']: selectedFolder as any[] }, false);
	} else {
		if (!poznavacka || getContent(poznavacka) !== selectedFolder.filter((f) => !isObject(f))) {
			fileSystemGoBack(true);
		}
		closeMenu();
	}
}
