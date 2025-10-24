import { usePoznavackaStore } from 'src/data';
import { objFirstValue } from 'src/utils';

/**
 * Returns array of the current files in `poznavacka` store.
 */
export function getFiles() {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	return objFirstValue(poznavacka!);
}
