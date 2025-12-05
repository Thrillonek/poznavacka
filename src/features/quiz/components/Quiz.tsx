import { useEffect } from 'react';
import { useModeStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import '../assets/_Quiz.scss';
import { useQuizFileStore } from '../data/stores';
import { addFileToCompleted, changeImage, initiateQuiz } from '../utils';
import QuizControlPanel from './QuizControlPanel';
import { ImageViewer, NameViewer } from './QuizImageViewer';

function Quiz() {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	const mode = useModeStore((store) => store.mode);

	useEffect(() => {
		initiateQuiz();
		changeImage();
	}, [poznavacka, settings.quiz, settings.removeDuplicates]);

	function handleKeyDown(e: KeyboardEvent) {
		if (mode !== 'quiz') return;
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

	useAddEventListener('keydown', handleKeyDown, [settings.keybinds]);

	return (
		<div className='quiz-container'>
			<ImageViewer />
			<NameViewer />
			<QuizControlPanel />
		</div>
	);
}

export default Quiz;
