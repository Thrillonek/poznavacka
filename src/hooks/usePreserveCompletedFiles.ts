import { useEffect, useRef } from 'react';
import { useCompletedFilesStore } from 'src/data';
import { transformPathsToSystem, transformSystemToPaths } from 'src/utils/transformPathsToSystem';

export function usePreserveCompletedFiles() {
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const setCompletedFiles = useCompletedFilesStore((store) => store.setCompletedFiles);

	const firstRenderRef = useRef(true);

	useEffect(() => {
		function execute() {
			if (!firstRenderRef.current) {
				localStorage.setItem('poznavacka-completed-files', JSON.stringify(transformPathsToSystem(completedFiles)));
				return;
			}

			firstRenderRef.current = false;

			const savedCompletedFiles = localStorage.getItem('poznavacka-completed-files');

			if (savedCompletedFiles) {
				const parsedCompletedFiles = transformSystemToPaths(JSON.parse(savedCompletedFiles)) as string[];

				setCompletedFiles(parsedCompletedFiles);
			}
		}

		execute();
	}, [completedFiles]);
}
