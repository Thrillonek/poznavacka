import { useEffect, useRef } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';

/**
 * Each time the `poznavacka` state changes, this hook updates the `min` and `max` values in settings.
 * It also generates an array containing a number for every preset available.
 */
export function useDefineDefaultValues() {
	const presetLength = useRef();
	const files = getFiles();

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const updateQuizSettings = useSettingsStore((store) => store.updateQuizSettings);

	useEffect(() => {
		if (poznavacka) {
			presetLength.current = [];
			for (let i = 1; i <= Math.floor(files.length / 10); i++) {
				presetLength.current.push(i);
			}
			updateQuizSettings('min', 1);
			updateQuizSettings('max', files.length);
		}
	}, [poznavacka]);

	return presetLength;
}
