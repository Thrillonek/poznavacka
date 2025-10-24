import { isObject, objFirstKey, objFirstValue } from './objectManipulation';

/**
 * Removes duplicate file names from the given file system object without respect to numbers.
 * It does this by iterating through the current file system files, checking, if each of them is
 * inside a predefined array and if it is not, it adds it into the array and the updated file system.
 *
 * @param fileSystem - The file system object to remove duplicates from.
 */
export function removeDuplicateFileNames(fileSystem: Object) {
	if (!fileSystem) return;
	let newFileSystem: Object[] = [];
	let uniqueItems: string[] = [];
	let poznavackaItems: string[] = objFirstValue(fileSystem);
	poznavackaItems.forEach((item) => {
		if (!isObject(item)) {
			let itemWithoutNum = item.replaceAll(/\d+/g, '');
			if (!uniqueItems.includes(itemWithoutNum)) {
				newFileSystem.push(item);
				uniqueItems.push(itemWithoutNum);
			}
		}
	});
	return { [objFirstKey(fileSystem)]: newFileSystem };
}
