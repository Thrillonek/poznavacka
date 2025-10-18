import { useEffect, useRef } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import '../assets/_Quiz.scss';
import { useQuizFileStore } from '../data/stores';
import { addFileToCompleted, changeImage, initiateQuiz } from '../utils';
import QuizControlPanel from './QuizControlPanel';
import QuizImageViewer from './QuizImageViewer';

function Quiz() {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	useEffect(() => {
		initiateQuiz();
		changeImage();
	}, [poznavacka, settings.quiz, settings.removeDuplicates]);

	function handleKeyDown(e) {
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

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0} className='justify-items-center grid grid-rows-8 bg-neutral-800 px-2 py-2 md:py-8 outline-none w-full h-full'>
			<QuizImageViewer />
			<QuizControlPanel />
		</div>
	);
}

export default Quiz;
