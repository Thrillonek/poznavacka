import { useEffect, useState } from 'react';
import ImageFit from 'src/components/ui/ImageFit';
import { useAddEventListener } from 'src/hooks';
import '../assets/_QuizImageViewer.scss';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { useQuizDisplayedText } from '../hooks/useQuizDisplayedText';
import { getDragRatio } from '../utils';

function ImageViewer() {
	const fileName = useQuizFileStore((store) => store.fileName);
	const completeFileLoading = useQuizFileStore((store) => store.completeFileLoading);
	const isFileLoaded = useQuizFileStore((store) => store.isFileLoaded);
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

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
			<div className='quiz-image-viewer'>{fileName && <ImageFit alt='' className='cursor-pointer' onClick={() => toggleFileNameRevealed()} style={{ transform: `translateX(${imageOffset}px)` }} important key={fileName} onLoad={completeFileLoading} src={fileName} />}</div>
		</>
	);
}

function NameViewer() {
	const { isFileLoaded } = useQuizFileStore((store) => store);
	const error = useQuizErrorStore((store) => store.error);
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	// Updates display text according to the current state of the quiz

	const { displayedText, displayedSubtext } = useQuizDisplayedText();

	return (
		<div onClick={() => toggleFileNameRevealed()} className='center-content'>
			<p data-loading={!isFileLoaded} data-error={Boolean(error)} className={'quiz-name-viewer'}>
				<span className='main-text'>{displayedText}</span>
				<span className='subtext'>{displayedSubtext}</span>
			</p>
		</div>
	);
}

export { ImageViewer, NameViewer };
