import type { Folder } from 'src/types/variables';
import { getFiles } from './getFiles';
import { getFolderName } from './objectManipulation';

/**
 * Removes duplicate file names from the given file system object without respect to numbers.
 * It does this by iterating through the current file system files, checking, if each of them is
 * inside a predefined array and if it is not, it adds it into the array and the updated file system.
 *
 * @param fileSystem - The file system object to remove duplicates from.
 */
export function removeDuplicateFileNames(fileSystem: Folder) {
	if (!fileSystem) return;
	let uniqueItems: string[] = [];
	let poznavackaItems: string[] = getFiles();
	let newPoznavackaItems: string[] = [];
	poznavackaItems.forEach((item) => {
		let itemWithoutNum = item.replaceAll(/[0-9+-]/g, '');
		if (!uniqueItems.includes(itemWithoutNum)) {
			console.log(item, itemWithoutNum);
			newPoznavackaItems.push(item);
			uniqueItems.push(itemWithoutNum);
		}
	});
	let newFileSystem: Folder = { [getFolderName(fileSystem)]: newPoznavackaItems };
	return newFileSystem;
}
