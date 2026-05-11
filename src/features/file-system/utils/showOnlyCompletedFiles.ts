import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';

export function showOnlyCompletedFiles() {
	const completedFiles = useCompletedFilesStore.getState().completedFiles;
	const setPoznavacka = usePoznavackaStore.getState().setPoznavacka;

	setPoznavacka({ '*completed*': completedFiles });
}
