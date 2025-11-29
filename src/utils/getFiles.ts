import { usePoznavackaStore } from 'src/data';
import { isObject, objFirstValue } from 'src/utils';

/**
 * Returns array of the current files in `poznavacka` store.
 */
export function getFiles(): string[] {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	return objFirstValue(poznavacka!).filter((f: any) => !isObject(f));
}
