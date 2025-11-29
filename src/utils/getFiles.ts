import { usePoznavackaStore } from 'src/data';
import { getContent, isObject } from 'src/utils';

/**
 * Returns array of the current files in `poznavacka` store.
 */
export function getFiles(): string[] {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	return getContent(poznavacka!).filter((f: any) => !isObject(f));
}
