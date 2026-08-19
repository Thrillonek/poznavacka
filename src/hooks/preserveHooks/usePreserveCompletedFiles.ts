import { useEffect, useRef } from 'react';
import { useCompletedFilesStore } from 'src/data';
import { transformPathsToSystem, transformSystemToPaths } from 'src/utils/transformPathsToSystem';
import z from 'zod';

const ParsedCompletedFiles = z.array(z.string().or(z.record(z.string(), z.any())));

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
				let parsedSavedCompletedFiles;
				try {
					parsedSavedCompletedFiles = JSON.parse(savedCompletedFiles);
				} catch (error) {
					console.error('Error parsing saved completed files:', error);
					return;
				}

				const parseResult = ParsedCompletedFiles.safeParse(parsedSavedCompletedFiles);
				if (!parseResult.success) {
					console.error('Parsed completed files do not match expected format:', parseResult.error);
					return;
				}

				const parsedCompletedFiles = transformSystemToPaths(parsedSavedCompletedFiles);
				if (!Array.isArray(parsedCompletedFiles)) {
					return console.error('Transformed completed files is not an array:', parsedCompletedFiles);
				}

				setCompletedFiles(parsedCompletedFiles);
			}
		}

		execute();
	}, [completedFiles]);
}
