import { useEffect, useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useListFilesStore } from '../data/stores';

export function useUpdateFiles() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setFiles = useListFilesStore((store) => store.setFiles);
	const settings = useSettingsStore((store) => store.settings);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const files = useMemo(() => getFiles(), [poznavacka]);

	useEffect(() => {
		let updatedFiles: Record<number, string> = {};
		let condition: ((file: string) => boolean) | undefined = undefined;

		switch (settings.list.showFiles) {
			case 'all':
				updatedFiles = Object.assign({}, files);
				break;
			case 'completed':
				condition = (file) => completedFiles.includes(file);
				break;
			case 'uncompleted':
				condition = (file) => !completedFiles.includes(file);
				break;
		}

		if (condition != null) {
			files.forEach((file, idx) => {
				if (condition(file)) updatedFiles[idx] = file;
			});
		}

		setFiles(updatedFiles);
	}, [files, settings.list.showFiles, completedFiles]);
}
