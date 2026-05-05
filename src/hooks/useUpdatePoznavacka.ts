import { useEffect } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { removeDuplicateFileNames } from 'src/utils/removeDuplicateFileNames';

/**
 * Handles changes on the derived `poznavacka` state based on the `removeDuplicates` setting.
 */
export function useUpdatePoznavacka() {
	const basePoznavacka = usePoznavackaStore((state) => state.basePoznavacka);
	const updatePoznavacka = usePoznavackaStore((state) => state.updatePoznavacka);
	const settings = useSettingsStore((state) => state.settings);

	useEffect(() => {
		let updatedPoznavacka = basePoznavacka;
		if (settings.general.removeDuplicates) {
			updatedPoznavacka = removeDuplicateFileNames(basePoznavacka);
		}

		updatePoznavacka(updatedPoznavacka);
	}, [settings.general.removeDuplicates, basePoznavacka]);
}
