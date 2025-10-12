import { usePoznavackaStore } from 'src/data';
import { capitalize, isObject, objFirstKey, objFirstValue } from 'src/utils';
import { useFileSystemStore, useMenuStore } from '../data/stores';

export function handleFolderChange(pozn) {
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;
	const { addToPath, setSelectedFolder, setFolderName } = useFileSystemStore.getState();
	const closeMenu = useMenuStore.getState().close;

	setPoznavacka(pozn);
	let content = objFirstValue(pozn);
	if (content.some((c) => isObject(c))) {
		addToPath(objFirstKey(pozn));
		setSelectedFolder(objFirstValue(pozn));
		setFolderName(capitalize(objFirstKey(pozn)));
	} else closeMenu();
}
