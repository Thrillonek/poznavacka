import { usePoznavackaStore } from '@/data';
import { isObject } from '@/utils';

export function toggleFolderNesting(content, event) {
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;

	const closeMenu = useMenuStore.getState().closeMenu;

	event.stopPropagation();
	if (poznavacka != content) setPoznavacka(content);

	let arr = Object.values(content)[0];
	while (arr.some((f) => isObject(f))) {
		let obj = arr.find((f) => isObject(f));
		arr = arr.concat(Object.values(obj)[0]);
		arr.splice(arr.indexOf(obj), 1);
	}
	setPoznavacka({ [Object.keys(content)[0]]: arr });
	closeMenu();
}
