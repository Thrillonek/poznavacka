import { useEffect } from 'react';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getFolderName } from 'src/utils';

export function useShowOnlyCompletedFiles() {
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const setPoznavacka = usePoznavackaStore((store) => store.setPoznavacka);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const poznavackaWithCompletedFiles = { '*completed*': [...completedFiles] };

	useEffect(() => {
		console.log('a');
		if (poznavacka && getFolderName(poznavacka) === '*completed*') {
			setPoznavacka(poznavackaWithCompletedFiles);
		}
	}, [completedFiles]);

	return () => setPoznavacka(poznavackaWithCompletedFiles);
}
