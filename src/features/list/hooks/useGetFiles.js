import { usePoznavackaStore } from '@/data';
import { objFirstValue } from '@/utils';

export function useGetFiles() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	return objFirstValue(poznavacka);
}
