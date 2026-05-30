import { useEffect, useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useDetailedEffect } from 'src/hooks/useDetailedEffect';
import { getFiles } from 'src/utils';
import { isFileInCurrentFolder } from 'src/utils/isFileInCurrentFolder';
import { useQuizFileStore } from '../data/stores';
import { currentIndex, fileIndexList } from '../data/variables';
import { changeImage, initiateQuiz } from '../utils';

export function useHandleQuizUpdates() {
	const updateSettings = useSettingsStore((store) => store.updateSettings);
	const settings = useSettingsStore((store) => store.settings);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const index = useQuizFileStore((store) => store.fileIndex);

	const files = useMemo(() => getFiles(), [poznavacka]);

	useDetailedEffect(
		(firstRender) => {
			if (!firstRender) {
				updateSettings('quiz', 'max', files.length);
			}
		},
		[files.length],
	);

	useDetailedEffect(
		(firstRender) => {
			if (!firstRender) {
				updateSettings('quiz', 'min', 1);
			}
		},
		[poznavacka],
	);

	useEffect(() => {
		initiateQuiz();
	}, [poznavacka, settings.quiz.random, settings.quiz.min]);

	useDetailedEffect(
		(firstRender) => {
			if (!firstRender) {
				let previousMax = settings.quiz.max;
				setTimeout(() => {
					// Prevents a lot of updates when sliding with the max value slider
					if (settings.quiz.max === previousMax) {
						initiateQuiz(false);
					}
				}, 250);
			}
		},
		[settings.quiz.max],
	);

	useEffect(() => {
		changeImage();
	}, [poznavacka, settings.quiz.random]);

	useDetailedEffect(
		(firstRender) => {
			if (!firstRender && (!index || index > settings.quiz.max || index < settings.quiz.min)) {
				changeImage();
			}
		},
		[settings.quiz.min, settings.quiz.max],
	);

	useDetailedEffect(
		(firstRender) => {
			if (!firstRender) {
				if (completedFiles.filter((f) => isFileInCurrentFolder(f)).length == 0) {
					initiateQuiz(false);
				}
			}
		},
		[completedFiles],
	);
}
