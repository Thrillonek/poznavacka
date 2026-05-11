import { useEffect, useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { isFileInCurrentFolder } from 'src/utils/isFileInCurrentFolder';
import { changeImage, initiateQuiz } from '../utils';

export function useHandleQuizUpdates() {
	const updateSettings = useSettingsStore((store) => store.updateSettings);
	const settings = useSettingsStore((store) => store.settings);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const files = useMemo(() => getFiles(), [poznavacka]);

	useEffect(() => {
		updateSettings('quiz', 'max', files.length);
	}, [poznavacka]);

	useEffect(() => {
		initiateQuiz();
		changeImage();
	}, [poznavacka, settings.quiz.min, settings.quiz.max, settings.quiz.random]);

	useEffect(() => {
		if (completedFiles.filter((f) => isFileInCurrentFolder(f)).length == 0) {
			initiateQuiz();
		}
	}, [completedFiles]);
}
