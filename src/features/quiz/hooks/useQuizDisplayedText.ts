import { useEffect, useState } from 'react';
import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFolderName, getGroupName, nameFromPath } from 'src/utils';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';

export function useQuizDisplayedText() {
	const [displayedText, setDisplayedText] = useState('');
	const [displayedSubtext, setDisplayedSubtext] = useState('');

	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { fileIndex, fileName, isFileLoaded, isFileNameRevealed } = useQuizFileStore((store) => store);
	const error = useQuizErrorStore((store) => store.error);

	// Updates display text according to the current state of the quiz
	useEffect(() => {
		// The actual conditions that tell what the text should say

		function updateDisplayedText() {
			if (error) return error;
			if (!isFileLoaded) return 'Načítání...';

			if (isFileNameRevealed) return nameFromPath(fileName!);

			if (settings.quiz.devMode && fileIndex) return fileIndex.toString();
		}

		let updatedDisplayedText = updateDisplayedText();

		setDisplayedText(updatedDisplayedText ?? '');
	}, [error, isFileLoaded, isFileNameRevealed, settings.quiz.devMode, fileName, poznavacka]);

	return { displayedText, displayedSubtext };
}
