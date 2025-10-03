import { useRef } from 'react';

function useToggleDuplicateFileNames(fileSystem, toggle) {
	if (!fileSystem) return;

	const toggled = useRef(false);
	const originalFileSystem = useRef();
	const updatedFileSystem = useRef();

	originalFileSystem.current = fileSystem;

	if (updatedFileSystem.current) return updatedFileSystem.current;

	let newPoznavacka = [];
	let uniqueItems = [];
	let arr = Object.values(fileSystem)[0];
	arr.forEach((item) => {
		if (!isObject(item)) {
			let itemWithoutNum = item.replaceAll(/\d+/g, '');
			if (!uniqueItems.includes(itemWithoutNum)) {
				newPoznavacka.push(item);
				uniqueItems.push(itemWithoutNum);
			}
		}
	});

	updatedFileSystem.current = newPoznavacka;

	toggled.current = !toggled.current;
	if (toggle.current || toggle === true) {
		return updatedFileSystem.current;
	} else {
		return originalFileSystem.current;
	}
}

export default useToggleDuplicateFileNames;
