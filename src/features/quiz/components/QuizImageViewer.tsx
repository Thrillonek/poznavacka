import { useEffect, useState } from 'react';
import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFolderName, getGroupName, nameFromPath } from 'src/utils';
import '../assets/_QuizImageViewer.scss';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';

function ImageViewer() {
	const { fileName, completeFileLoading } = useQuizFileStore((store) => store);

	return (
		<>
			<div className='quiz-image-viewer'>
				<img onLoad={completeFileLoading} src={fileName?.replace(' ', '%20').replace('+', '%2b')} />
			</div>
		</>
	);
}

function NameViewer() {
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

			if (settings.devMode && fileIndex) return (updatedDisplayedText = fileIndex.toString());
		}

		updateDisplayedText();

		setDisplayedText(updatedDisplayedText);
		setDisplayedSubtext(updatedDisplayedSubtext);
	}, [error, isFileLoaded, isFileNameRevealed, settings.devMode, fileName, poznavacka]);

	return (
		<div className='center-content'>
			<p data-loading={!isFileLoaded} data-error={Boolean(error)} className={'quiz-name-viewer'}>
				<span className='main-text'>{displayedText}</span>
				<span className='subtext'>{displayedSubtext}</span>
			</p>
		</div>
	);
}

export { ImageViewer, NameViewer };
