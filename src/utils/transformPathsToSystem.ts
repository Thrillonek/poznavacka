import type { Folder } from 'src/types/variables';
import { getContent, getFolderName } from './objectManipulation';

export function transformPathsToSystem(paths: string[]) {
	const fileSystem: (Folder | string)[] = [];

	paths.forEach((path) => {
		const folderArray = path.split('/').slice(1);

		let currentFolder = fileSystem;

		folderArray.forEach((folder, idx) => {
			if (idx == folderArray.length - 1) {
				currentFolder.push(folder);
				return;
			}

			if (!currentFolder.some((item) => typeof item === 'object' && Object.keys(item as object)[0] === folder)) {
				let newArray: (Folder | string)[] = [];
				currentFolder.push({ [folder]: newArray as Object[] });
				currentFolder = newArray;
			} else {
				currentFolder = getContent(currentFolder.find((item) => getFolderName(item as object) === folder) as object);
			}
		});
	});

	return fileSystem;
}

export function transformSystemToPaths(system: (Folder | string)[]) {
	const paths: string[] = [];

	let pathArray: string[] = [];
	function searchFolder(folder: any[]) {
		folder.forEach((item) => {
			if (typeof item === 'string') {
				pathArray.push(item);
				paths.push('/' + pathArray.join('/'));
			} else {
				pathArray.push(getFolderName(item as object));
				searchFolder(getContent(item as object));
			}
			pathArray.pop();
		});
	}

	searchFolder(system);

	return paths;
}
