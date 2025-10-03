import { usePoznavackaStore, useSettingsStore } from '@/data';
import { removeDuplicateFileNames } from '@/utils/removeDuplicateFileNames';
import { useEffect } from 'react';

export function useUpdatePoznavacka() {
	const basePoznavacka = usePoznavackaStore((state) => state.basePoznavacka);
	const updatePoznavacka = usePoznavackaStore((state) => state.updatePoznavacka);
	const settings = useSettingsStore((state) => state.settings);

	useEffect(() => {
		if (settings.removeDuplicates) {
			const updatedPoznavacka = removeDuplicateFileNames(basePoznavacka);
			updatePoznavacka(updatedPoznavacka);
		} else {
			updatePoznavacka(basePoznavacka);
		}
	}, [settings.removeDuplicates, basePoznavacka]);
}
