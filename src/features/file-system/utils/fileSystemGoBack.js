import { fileSystem, usePoznavackaStore } from '@/data';
import { objFirstKey, objFirstValue } from '@/utils';
import { useFileSystemStore } from '../data/stores';

export function fileSystemGoBack({ current }) {
	const { path, cutPath, setSelectedFolder, setFolderName } = useFileSystemStore.getState();
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;

	let currentArr = fileSystem;
	let currentObject;

	// Loop that goes through every level of the file system to find the right folder (dir)
	for (let i of path) {
		if (path.indexOf(i) == path.length - 1 && !current) break;
		currentObject = currentArr.find((f) => objFirstKey(f) == i);
		currentArr = objFirstValue(currentObject);
	}
	// method is current when trying to view the content of the current folder (dir)
	if (current) {
		setPoznavacka(currentObject);
	} else {
		cutPath();
		setSelectedFolder(currentArr);
		if (currentObject) {
			setFolderName(capitalize(objFirstKey(currentObject)));
		} else {
			setFolderName('');
		}
	}
}
