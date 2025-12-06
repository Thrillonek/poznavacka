import { usePoznavackaStore } from 'src/data';
import { getContent, isObject } from 'src/utils';

/**
 * Returns array of the current files in `poznavacka` store.
 */
export function getFiles(): string[] {
	const poznavacka = usePoznavackaStore.getState().poznavacka;
	const content = getContent(poznavacka!);
	if (!content || !content.length) return [];

	return content.filter((f: any) => !isObject(f));
}
