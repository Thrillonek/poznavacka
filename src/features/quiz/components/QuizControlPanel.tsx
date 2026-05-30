import { Icon } from '@iconify/react';
import clsx from 'clsx';
import Modal from 'src/components/form/Modal';
import { useSettingsStore } from 'src/data';
import { useModalStore } from 'src/data/modalStore';
import '../assets/_QuizControlPanel.scss';
import { useQuizFileStore } from '../data/stores';
import { fileIndexList, previousFiles } from '../data/variables';
import { useHandleSwiping } from '../hooks/useHandleSwiping';
import { addFileToCompleted, changeImage, initiateQuiz, showPreviousFile } from '../utils';
import QuizIndicators from './QuizIndicators';

function QuizControlPanel() {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);
	const isFileNameRevealed = useQuizFileStore((store) => store.isFileNameRevealed);

	const setModal = useModalStore((store) => store.setModal);

	// let isPreviousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	useHandleSwiping();

	const isEverythingCompleted = fileIndexList.main.filter((v) => v !== null).length + fileIndexList.recent.filter((v) => v !== null).length === 0;

	function refreshQuiz() {
		initiateQuiz(false, true);
		changeImage();
	}

	return (
		<div className='flex flex-col justify-between items-center py-4!'>
			<div className='quiz-control-panel'>
				<button onClick={showPreviousFile} className={'control-button ' + (!(previousFiles.length > 1) ? 'disabled' : '')}>
					<Icon icon='mdi:arrow-left' />
				</button>
				<button className='control-button' onClick={() => toggleFileNameRevealed()}>
					<Icon icon={'mdi:eye' + (isFileNameRevealed ? '-off' : '')} />
				</button>
				<button onClick={() => changeImage()} className='control-button'>
					<Icon icon='mdi:arrow-right' />
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
