import { Icon } from '@iconify/react';
import clsx from 'clsx';
import Modal from 'src/components/form/Modal';
import { useSettingsStore } from 'src/data';
import { useModalStore } from 'src/data/modalStore';
import '../assets/_QuizControlPanel.scss';
import { useQuizFileStore, useQuizRandomIndexStore } from '../data/stores';
import { currentIndex, fileIndexList } from '../data/variables';
import { useHandleSwiping } from '../hooks/useHandleSwiping';
import { addFileToCompleted, changeImage, initiateQuiz, showPreviousFile } from '../utils';
import QuizIndicators from './QuizIndicators';

function QuizControlPanel() {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);
	const isFileNameRevealed = useQuizFileStore((store) => store.isFileNameRevealed);

	const quizRandomHistory = useQuizRandomIndexStore((store) => store.history);

	const setModal = useModalStore((store) => store.setModal);

	const settings = useSettingsStore((store) => store.settings);

	useHandleSwiping();

	const isEverythingCompleted = fileIndexList.main.filter((v) => v !== null).length + fileIndexList.recent.filter((v) => v !== null).length === 0;

	function refreshQuiz() {
		initiateQuiz(false, true);
		changeImage();
	}

	function resetIndex() {
		currentIndex.current = undefined;
		changeImage({ firstImage: true });
	}

	return (
		<div className='flex flex-col justify-between items-center py-4!'>
			<div className='quiz-control-panel'>
				<button onClick={showPreviousFile} className={clsx('control-button', settings.quiz.random && quizRandomHistory.length === 0 && 'disabled')}>
					<Icon icon='mdi:arrow-left' />
				</button>
				<button className='control-button' onClick={() => toggleFileNameRevealed()}>
					<Icon icon={'mdi:eye' + (isFileNameRevealed ? '-off' : '')} />
				</button>
				<button onClick={() => changeImage()} className='control-button'>
					<Icon icon='mdi:arrow-right' />
				</button>
				<button onClick={() => resetIndex()} className={clsx('control-button', settings.quiz.random && 'disabled')}>
					<Icon icon='mdi:undo' />
				</button>
				<button onClick={() => (!isEverythingCompleted ? addFileToCompleted() : setModal('Resetovat naučené obrázky z výběru'))} className={clsx('complete-button control-button')}>
					<Icon icon={isEverythingCompleted ? 'mdi:refresh' : 'mdi:checkbox-marked-circle-outline'} />
				</button>
			</div>
			<Modal title='Resetovat naučené obrázky z výběru' text='Tato funkce resetuje naučené obrázky ve vybraném rozsahu.' confirmText='Potvrdit' onConfirm={refreshQuiz} />
			<QuizIndicators />
		</div>
	);
}

export default QuizControlPanel;
