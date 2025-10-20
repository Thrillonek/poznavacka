import { useEffect, useRef } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { removeDuplicateFileNames } from 'src/utils/removeDuplicateFileNames';

/**
 * Handles changes on the derived `poznavacka` state based on the `removeDuplicates` setting.
 */
export function useUpdatePoznavacka() {
	const basePoznavacka = usePoznavackaStore((state) => state.basePoznavacka);
	const updatePoznavacka = usePoznavackaStore((state) => state.updatePoznavacka);
	const settings = useSettingsStore((state) => state.settings);

	const poznavackaWithoutDuplicates = useRef();

	useEffect(() => {
		poznavackaWithoutDuplicates.current = null;
	}, [basePoznavacka]);

	useEffect(() => {
		if (settings.removeDuplicates) {
			if (poznavackaWithoutDuplicates.current == null) {
				poznavackaWithoutDuplicates.current = removeDuplicateFileNames(basePoznavacka);
			}
			updatePoznavacka(poznavackaWithoutDuplicates.current);
		} else {
			updatePoznavacka(basePoznavacka);
		}
	}, [settings.removeDuplicates, basePoznavacka]);
}
