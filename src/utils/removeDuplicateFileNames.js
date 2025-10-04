import { isObject } from './objectManipulation';

export function removeDuplicateFileNames(fileSystem) {
	if (!fileSystem) return;
	let newFileSystem = [];
	let uniqueItems = [];
	let arr = Object.values(fileSystem)[0];
	arr.forEach((item) => {
		if (!isObject(item)) {
			let itemWithoutNum = item.replaceAll(/\d+/g, '');
			if (!uniqueItems.includes(itemWithoutNum)) {
				newFileSystem.push(item);
				uniqueItems.push(itemWithoutNum);
			}
		}
	});
	return { [Object.keys(fileSystem)[0]]: newFileSystem };
}
