import { fileSystem, usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName } from 'src/utils';
import { useFileSystemStore } from '../data/stores';

/**
 * Function, that either exits the parent folder or shows its contents.
 * It goes through each layer of the file system to find the right folder to view.
 * @param current - If the function should view the contents of the parent folder.
 * @param level - The level of the file system (folder) that the function should apply to.
 */
export function fileSystemGoBack(current?: boolean, level?: string) {
	const { path, cutPath, setSelectedFolder, setFolderName } = useFileSystemStore.getState();
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;

	let currentArr: Folder[] = fileSystem;
	let currentObject;

	// Loop that goes through every level of the file system to find the right folder (dir)
	for (let i of path) {
		if (path.indexOf(i) == path.length - 1 && !current) break;
		if (level && level == '0') break;

		currentObject = currentArr.find((f) => getFolderName(f!) == i);
		currentArr = getContent(currentObject!);

		if (level && level == i) break;
	}
	// method is current when trying to view the content of the current folder (dir)
	if (!current) {
		cutPath();
		setSelectedFolder(currentArr);
		if (currentObject) {
			setFolderName(capitalize(getFolderName(currentObject)));
		} else {
			setFolderName('');
		}
	}

	setPoznavacka(currentObject);
}
