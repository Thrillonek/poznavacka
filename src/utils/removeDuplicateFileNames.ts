import type { FileSystem } from 'src/types/variables';
import { isObject, objFirstKey, objFirstValue } from './objectManipulation';

/**
 * Removes duplicate file names from the given file system object without respect to numbers.
 * It does this by iterating through the current file system files, checking, if each of them is
 * inside a predefined array and if it is not, it adds it into the array and the updated file system.
 *
 * @param fileSystem - The file system object to remove duplicates from.
 */
export function removeDuplicateFileNames(fileSystem: FileSystem) {
	if (!fileSystem) return;
	let uniqueItems: string[] = [];
	let poznavackaItems: string[] = objFirstValue(fileSystem);
	let newPoznavackaItems: string[] = [];
	poznavackaItems.forEach((item) => {
		if (!isObject(item)) {
			let itemWithoutNum = item.replaceAll(/\d+/g, '');
			if (!uniqueItems.includes(itemWithoutNum)) {
				newPoznavackaItems.push(item);
				uniqueItems.push(itemWithoutNum);
			}
		}
	});
	let newFileSystem: FileSystem = { [objFirstKey(fileSystem)]: newPoznavackaItems };
	return newFileSystem;
}
