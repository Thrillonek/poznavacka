import { Icon } from '@iconify/react';
import { useSettingsStore } from 'src/data';
import '../assets/_QuizControlPanel.scss';
import { useQuizFileStore } from '../data/stores';
import { previousFiles } from '../data/variables';
import { useHandleSwiping } from '../hooks/useHandleSwiping';
import { addFileToCompleted, changeImage, showPreviousFile } from '../utils';
import QuizIndicators from './QuizIndicators';

function QuizControlPanel() {
	const { toggleFileNameRevealed, fileIndex, isFileNameRevealed } = useQuizFileStore((store) => store);

	let isPreviousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	useHandleSwiping();

	return (
		<div className='flex flex-col gap-8 center-content'>
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
				<button onClick={addFileToCompleted} className='control-button complete-button'>
					<Icon icon='mdi:checkbox-marked-circle-outline' />
				</button>
			</div>
			<QuizIndicators />
		</div>
	);
}

export default QuizControlPanel;
