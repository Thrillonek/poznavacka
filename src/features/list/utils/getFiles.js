import { usePoznavackaStore } from '@/data';
import { objFirstValue } from '@/utils';

export function getFiles() {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	return objFirstValue(poznavacka);
}
