import type { FileSystem } from 'src/types/variables';
import { removeDuplicateFileNames } from 'src/utils/removeDuplicateFileNames.js';
import { usePoznavackaStore, useSettingsStore } from './stores.js';

const isRemovingDuplicates = useSettingsStore.getState().settings.removeDuplicates;
const poznavacka = usePoznavackaStore.getState().poznavacka;

let updatedPoznavacka: FileSystem = poznavacka;
if (isRemovingDuplicates) {
	updatedPoznavacka = removeDuplicateFileNames(poznavacka);
}

export const cleanPoznavacka = updatedPoznavacka;
