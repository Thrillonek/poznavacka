import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, isObject, objFirstKey, objFirstValue } from 'src/utils';
import { useFileSystemStore, useMenuStore } from '../data/stores';

/**
 * Updates the viewed file system to the selected folder.
 * If the folder contains files, it stores them in `poznavacka` state, so that the user can view them.
 * @param pozn - The new folder.
 */
export function handleFolderChange(pozn: Folder) {
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;
	const { addToPath, setSelectedFolder, setFolderName } = useFileSystemStore.getState();
	const closeMenu = useMenuStore.getState().close;

	setPoznavacka(pozn);
	let content: Folder[] | string[] = objFirstValue(pozn!);
	if (content.some((c) => isObject(c))) {
		addToPath(objFirstKey(pozn!));
		setSelectedFolder(objFirstValue(pozn!));
		setFolderName(capitalize(objFirstKey(pozn!)));
	} else closeMenu();
}
