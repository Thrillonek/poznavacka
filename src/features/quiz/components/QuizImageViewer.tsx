import { useEffect, useState } from 'react';
import ImageFit from 'src/components/ui/ImageFit';
import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFolderName, getGroupName, nameFromPath } from 'src/utils';
import '../assets/_QuizImageViewer.scss';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { getDragRatio } from '../utils';

function ImageViewer() {
	const fileName = useQuizFileStore((store) => store.fileName);
	const completeFileLoading = useQuizFileStore((store) => store.completeFileLoading);
	const isFileLoaded = useQuizFileStore((store) => store.isFileLoaded);

	const [imageOffset, setImageOffset] = useState(0);

	useEffect(() => {
		const image = document.querySelector('.quiz-image-viewer img') as HTMLImageElement;
		if (!isFileLoaded && image?.naturalWidth > 0 && image.complete) {
			completeFileLoading();
		}
	}, [isFileLoaded]);

	useAddEventListener('custom:drag', (e: CustomEvent) => {
		if (e.detail.isTouch) setImageOffset((getDragRatio(e.detail.deltaX) as number) * 250);
	});
	useAddEventListener('touchend', () => setImageOffset(0));

	return (
		<>
			<div className='quiz-image-viewer'>
				<ImageFit style={{ transform: `translateX(${imageOffset}px)` }} key={fileName} onLoad={completeFileLoading} src={fileName?.replace(' ', '%20').replace('+', '%2b')!} />
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

			if (settings.quiz.devMode && fileIndex) return (updatedDisplayedText = fileIndex.toString());
		}

		updateDisplayedText();

		setDisplayedText(updatedDisplayedText);
		setDisplayedSubtext(updatedDisplayedSubtext);
	}, [error, isFileLoaded, isFileNameRevealed, settings.quiz.devMode, fileName, poznavacka]);

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
