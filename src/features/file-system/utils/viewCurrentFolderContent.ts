import { usePoznavackaStore } from 'src/data';
import { getContent, isObject } from 'src/utils';
import { useFileSystemStore, useMenuStore, useSelectMultipleStore } from '../data/stores';
import { fileSystemGoBack } from './fileSystemGoBack';
import { addSet, removeSet } from './selectMultipleFunctionMutators';

export function viewCurrentFolderContent() {
	const closeMenu = useMenuStore.getState().close;
	const selectedFolder = useFileSystemStore.getState().selectedFolder;
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	const isSelecting = useSelectMultipleStore.getState().isSelecting;
	const selectedItems = useSelectMultipleStore.getState().selectedItems;

	if (isSelecting) {
		if (selectedItems.includes('this')) {
			removeSet({ this: selectedFolder as any[] }, false);
		} else {
			addSet({ this: selectedFolder as any[] }, false);
		}
	} else {
		if (!poznavacka || getContent(poznavacka) !== selectedFolder.filter((f) => !isObject(f))) {
			fileSystemGoBack(true);
		}
		closeMenu();
	}
}
