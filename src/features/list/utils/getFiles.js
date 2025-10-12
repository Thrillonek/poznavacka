import { usePoznavackaStore } from 'src/data';
import { objFirstValue } from 'src/utils';

export function getFiles() {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	return objFirstValue(poznavacka);
}
