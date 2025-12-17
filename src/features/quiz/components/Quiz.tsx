import { useEffect, useState, type CSSProperties } from 'react';
import { useModeStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils';
import '../assets/_Quiz.scss';
import { useQuizFileStore } from '../data/stores';
import { addFileToCompleted, changeImage, getDragRatio, initiateQuiz } from '../utils';
import QuizControlPanel from './QuizControlPanel';
import { ImageViewer, NameViewer } from './QuizImageViewer';

function Quiz(props: any) {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	const mode = useModeStore((store) => store.mode);

	const updateQuizSettings = useSettingsStore((store) => store.updateQuizSettings);

	const [completeOpacity, setCompleteOpacity] = useState(0);
	const [dangerOpacity, setDangerOpacity] = useState(0);

	useEffect(() => {
		updateQuizSettings('max', getFiles().length);
	}, [poznavacka]);

	useEffect(() => {
		initiateQuiz();
		changeImage();
	}, [poznavacka, settings.quiz.min, settings.quiz.max, settings.quiz.random]);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key == settings.keybinds.change) {
			changeImage();
		}
		if (e.key == settings.keybinds.reveal) {
			toggleFileNameRevealed();
		}
		if (e.key == settings.keybinds.complete) {
			addFileToCompleted();
		}
	}

	useAddEventListener('keydown', handleKeyDown, [settings.keybinds, mode]);
	useAddEventListener('custom:drag', (e: CustomEvent) => {
		// if (!e.detail.isTouch) return;

		setCompleteOpacity(e.detail.deltaX < -20 ? -((getDragRatio(e.detail.deltaX) as number) * 2.5) : 0);

		setDangerOpacity(e.detail.deltaX > 20 ? (getDragRatio(e.detail.deltaX) as number) * 2.5 : 0);
	});
	useAddEventListener('pointerup', () => {
		setCompleteOpacity(0);
		setDangerOpacity(0);
	});

	return (
		<div tabIndex={0} style={props.style} className='quiz-container'>
			<ImageViewer />
			<NameViewer />
			<QuizControlPanel />
			<div style={{ '--opacity': completeOpacity } as CSSProperties} data-left className='quiz-indicator'></div>
			<div style={{ '--opacity': dangerOpacity, '--base-color': 'var(--danger)' } as CSSProperties} data-right className='quiz-indicator'></div>
		</div>
	);
}

export default Quiz;
