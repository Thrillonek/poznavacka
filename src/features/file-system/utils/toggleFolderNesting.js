import { usePoznavackaStore } from 'src/data';
import { isObject, objFirstKey, objFirstValue } from 'src/utils';

/**
 * Function, that takes the selected folder and shows every file inside itself and inside its subfolders.
 * If the nesting is already turned on, it changes to showing only the files directly inside the folder.
 * @param content - The folder to look through.
 * @param event - The event that triggered the function call.
 */
export function toggleFolderNesting(content, event) {
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;

	const closeMenu = useMenuStore.getState().closeMenu;

	event.stopPropagation();
	if (poznavacka != content) setPoznavacka(content);

	let arr = objFirstValue(content);
	while (arr.some((f) => isObject(f))) {
		let obj = arr.find((f) => isObject(f));
		arr = arr.concat(objFirstValue(obj));
		arr.splice(arr.indexOf(obj), 1);
	}
	setPoznavacka({ [objFirstKey(content)]: arr });
	closeMenu();
}
