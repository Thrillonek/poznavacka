import { usePoznavackaStore } from 'src/data';
import { getContent } from './objectManipulation';

export function checkPoznavackaIncludes(arr: any[]): boolean {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	arr = arr.filter((item) => {
		if (typeof item !== 'string') return false;
		return true;
	});

	if (!poznavacka || arr.length < 1) return false;

	return arr.every((item) => getContent(poznavacka).includes(item));
}
