import type { FormEvent } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder, FolderContent } from 'src/types/variables';
import { getContent, getFolderName, isObject } from 'src/utils';
import { compareArrays } from 'src/utils/compareArrays';
import { useMenuStore, useSelectMultipleStore } from '../data/stores';
import { addSet, removeSet } from './selectMultipleFunctionMutators';

/**
 * Function, that takes the selected folder and shows every file inside itself and inside its subfolders.
 * If the nesting is already turned on, it changes to showing only the files directly inside the folder.
 * @param folder - The folder to look through.
 * @param settings:
 * - mutatePoznavacka - If the function should change the `poznavacka` state or just return the nested value.
 */
export function toggleFolderNesting(folder: Folder) {
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;
	const { isSelecting: isSelectingMultiple, selectedItems } = useSelectMultipleStore.getState();

	const closeMenu = useMenuStore.getState().close;

	if (compareArrays(getContent(poznavacka!), extractNestedContent(folder))) {
		setPoznavacka(folder);
		return;
	}

	if (isSelectingMultiple) {
		if (selectedItems.includes(getFolderName(folder!))) {
			removeSet(folder);
		} else {
			addSet(folder);
		}
	} else {
		let arr: FolderContent = extractNestedContent(folder);
		let newPoznavacka: Folder = { [getFolderName(folder!)]: arr };

		setPoznavacka(newPoznavacka);
		closeMenu();
	}
}

export function extractNestedContent(content: Folder): string[] {
	let arr: Array<Object | string> = getContent(content!);
	while (arr.some((f) => isObject(f))) {
		let obj = arr.find((f) => isObject(f));
		arr = arr.concat(getContent(obj as object));
		arr.splice(arr.indexOf(obj!), 1);
	}
	return arr as string[];
}
