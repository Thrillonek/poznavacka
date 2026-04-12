import type { FormEvent } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder, FolderContent } from 'src/types/variables';
import { getContent, getFolderName, isObject } from 'src/utils';
import { useMenuStore, useSelectMultipleStore } from '../data/stores';
import { addSet, removeSet } from './selectMultipleFunctionMutators';

/**
 * Function, that takes the selected folder and shows every file inside itself and inside its subfolders.
 * If the nesting is already turned on, it changes to showing only the files directly inside the folder.
 * @param content - The folder to look through.
 * @param settings:
 * - mutatePoznavacka - If the function should change the `poznavacka` state or just return the nested value.
 */
export function toggleFolderNesting(content: Folder) {
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;
	const { isSelecting: isSelectingMultiple, selectedItems } = useSelectMultipleStore.getState();

	const closeMenu = useMenuStore.getState().close;

	if (poznavacka != content) setPoznavacka(content);

	if (isSelectingMultiple) {
		if (selectedItems.includes(getFolderName(content!))) {
			removeSet(content);
		} else {
			addSet(content);
		}
	} else {
		let arr: FolderContent = extractNestedContent(content);
		let newPoznavacka: Folder = { [getFolderName(content!)]: arr };

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
