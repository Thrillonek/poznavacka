import type { FormEvent } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder, FolderContent } from 'src/types/variables';
import { getContent, getFolderName, isObject } from 'src/utils';
import { checkPoznavackaIncludes } from 'src/utils/checkPoznavackaIncludes';
import { useMenuStore, useSelectMultipleStore } from '../data/stores';
import { addSet, removeSet, toggleSet } from './selectMultipleFunctionMutators';

/**
 * Function, that takes the selected folder and shows every file inside itself and inside its subfolders.
 * If the nesting is already turned on, it changes to showing only the files directly inside the folder.
 * @param folder - The folder to look through.
 * @param settings:
 * - mutatePoznavacka - If the function should change the `poznavacka` state or just return the nested value.
 */
export function toggleFolderNesting(folder: Folder) {
	const { setPoznavacka, poznavacka } = usePoznavackaStore.getState();
	const { isSelecting: isSelectingMultiple } = useSelectMultipleStore.getState();

	const closeMenu = useMenuStore.getState().close;

	if (isSelectingMultiple) {
		toggleSet(folder);
	} else {
		let extractedContent = extractNestedContent(folder);

		if (checkPoznavackaIncludes(extractedContent, poznavacka)) {
			setPoznavacka(folder);
			return;
		}

		let arr: FolderContent = extractedContent;
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
