import { useEffect, useRef } from 'react';
import { allowedFileExtensions, usePoznavackaStore, useSettingsStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { getContent, getFolderName, isObject } from 'src/utils';
import { removeDuplicateFileNames } from 'src/utils/removeDuplicateFileNames';

/**
 * Handles changes on the derived `poznavacka` state based on the `removeDuplicates` setting.
 */
export function useUpdatePoznavacka() {
	const basePoznavacka = usePoznavackaStore((state) => state.basePoznavacka);
	const settings = useSettingsStore((state) => state.settings);

	const poznavackaWithoutDuplicates = useRef<Folder>();

	useEffect(() => {
		poznavackaWithoutDuplicates.current = null;
	}, [basePoznavacka]);

	useEffect(() => {
		if (settings.general.removeDuplicates) {
			if (poznavackaWithoutDuplicates.current == null) {
				poznavackaWithoutDuplicates.current = removeDuplicateFileNames(basePoznavacka);
			}
			filterAndUpdatePoznavacka(poznavackaWithoutDuplicates.current);
		} else {
			filterAndUpdatePoznavacka(basePoznavacka);
		}
	}, [settings.general.removeDuplicates, basePoznavacka]);
}

function filterAndUpdatePoznavacka(poznavacka: Folder) {
	const updatePoznavacka = usePoznavackaStore.getState().updatePoznavacka;

	if (poznavacka)
		updatePoznavacka({
			[getFolderName(poznavacka)]: getContent<string[]>(poznavacka).filter((item) => {
				if (!isObject(item)) {
					return allowedFileExtensions.some((f) => item.endsWith(f));
				}
			}),
		});
}
