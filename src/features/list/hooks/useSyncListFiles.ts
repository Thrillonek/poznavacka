import { useEffect, useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useListFilesStore } from '../data/stores';

export function useSyncListFiles() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const files = useMemo(() => getFiles(), [poznavacka]);

	useEffect(() => {
		syncListFiles(files);
	}, [files, settings.list.showFiles, completedFiles]);
}

export function syncListFiles(files: string[]) {
	const setListFiles = useListFilesStore.getState().setFiles;
	const settings = useSettingsStore.getState().settings;
	const completedFiles = useCompletedFilesStore.getState().completedFiles;

	let updatedFiles = new Map<number, string>();
	let condition: ((file: string) => boolean) | undefined = undefined;

	switch (settings.list.showFiles) {
		case 'all':
			updatedFiles = new Map<number, string>(getFiles().map((file, idx) => [idx, file]));
			break;
		case 'completed':
			condition = (file) => completedFiles.includes(file);
			break;
		case 'uncompleted':
			condition = (file) => !completedFiles.includes(file);
			break;
	}

	if (condition != undefined) {
		files.forEach((file, idx) => {
			if (condition(file)) updatedFiles.set(idx, file);
		});
	}

	setListFiles(updatedFiles);
}
