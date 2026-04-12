import { usePoznavackaStore } from 'src/data';
import { getContent } from './objectManipulation';

//write a function with the file's name and export it
export function checkPoznavackaIncludes(arr: any[]): boolean {
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	arr = arr.filter((item) => typeof item === 'string');
	if (!poznavacka || arr.length < 1) return false;
	return arr.every((item) => getContent(poznavacka).includes(item));
}
