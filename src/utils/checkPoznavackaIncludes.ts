import type { Folder } from 'src/types/variables';
import { getContent } from './objectManipulation';

/**
 * Checks if the given array of strings is included in the `poznavacka` state
 * @param arr The array to check
 * @param poznavacka Poznavacka state - has to be here to trigger a re-render
 */
export function checkPoznavackaIncludes(arr: any[], poznavacka: Folder): boolean {
	if (!Array.isArray(arr)) return false;

	arr = arr.filter((item) => {
		if (typeof item !== 'string') return false;
		return true;
	});

	if (!poznavacka || arr.length < 1) return false;

	return arr.every((item) => getContent(poznavacka).includes(item));
}
