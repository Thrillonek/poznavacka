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
		let updatedDisplayedText = '';
		let updatedDisplayedSubtext = '';

		// The actual conditions that tell what the text should say
		function updateDisplayedText() {
			if (error) return (updatedDisplayedText = error);
			if (!isFileLoaded) return (updatedDisplayedText = 'Načítání...');

			if (isFileNameRevealed) {
				if (getFolderName(poznavacka!).toLowerCase() == 'hmyz') {
					updatedDisplayedSubtext = 'Řád: ' + getGroupName(fileIndex! - 1, insectGroupNames);
				}
				return (updatedDisplayedText = nameFromPath(fileName!));
			}

			if (settings.quiz.devMode && fileIndex) return (updatedDisplayedText = fileIndex.toString());
		}

		updateDisplayedText();

		setDisplayedText(updatedDisplayedText);
		setDisplayedSubtext(updatedDisplayedSubtext);
	}, [error, isFileLoaded, isFileNameRevealed, settings.quiz.devMode, fileName, poznavacka]);

	return { displayedText, displayedSubtext };
}
