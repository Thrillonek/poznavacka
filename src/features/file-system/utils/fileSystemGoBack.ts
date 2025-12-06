import { fileSystem, usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName } from 'src/utils';
import { useFileSystemStore } from '../data/stores';

/**
 * Goes through each layer of the file system to find the intended folder to view.
 * You can view the parent folder content, go back a level of depth in the file system or multiple levels.
 * @param current - If the function should view the contents of the parent folder.
 * @param level - The level of the file system (folder) that the function should apply to.
 */
export function fileSystemGoBack(current?: boolean, level?: string) {
	const { path, cutPath, setSelectedFolder, setFolderName } = useFileSystemStore.getState();
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;

	let currentArr: Folder[] = fileSystem;
	let currentObject;

	let pathCutNumber: number = 1;
	if (level) pathCutNumber = path.length - path.indexOf(level) - 1;

	// Loop that goes through every level of the file system to find the right folder (dir)
	for (let i of path) {
		if (path.indexOf(i) == path.length - 1 && !current && !level) break;
		if (level && level == '0') break;

		currentObject = currentArr.find((f) => getFolderName(f!) == i);
		currentArr = getContent(currentObject!);

		if (level && level == i) break;
	}
	// method is current when trying to view the content of the current folder (dir)
	if (!current) {
		// pathCutNumber is 1 if level is undefined
		for (let i = 0; i < pathCutNumber; i++) {
			cutPath();
		}

		setSelectedFolder(currentArr);
		if (currentObject) {
			setFolderName(capitalize(getFolderName(currentObject)));
		} else {
			setFolderName('');
		}
	}

	setPoznavacka(currentObject);
}
