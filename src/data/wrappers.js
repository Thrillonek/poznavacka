import { removeDuplicateFileNames } from '@/utils/removeDuplicateFileNames.js';
import { usePoznavackaStore, useSettingsStore } from './stores.js';

const isRemovingDuplicates = useSettingsStore.getState().settings.removeDuplicates;
const poznavacka = usePoznavackaStore.getState().poznavacka;

let updatedPoznavacka = poznavacka;
if (isRemovingDuplicates) {
	updatedPoznavacka = removeDuplicateFileNames(poznavacka);
}

export const cleanPoznavacka = updatedPoznavacka;
