import { Icon } from '@iconify/react';
import { useSettingsStore } from 'src/data';
import '../assets/_QuizControlPanel.scss';
import { useQuizFileStore } from '../data/stores';
import { previousFiles } from '../data/variables';
import { addFileToCompleted, changeImage, showPreviousFile } from '../utils';

function QuizControlPanel() {
	const { toggleFileNameRevealed, fileIndex, isFileNameRevealed } = useQuizFileStore((store) => store);
	const settings = useSettingsStore((store) => store.settings);

	let isPreviousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	return (
		<div className='center-content'>
			<div className='quiz-control-panel-container'>
				<div className='quiz-control-panel'>
					<button onClick={showPreviousFile} className={'control-button ' + (!(previousFiles.length > 1) ? 'disabled' : '')}>
						<Icon icon='mdi:undo' className={isPreviousAvailable || !settings.quiz.random ? '' : '-scale-x-100'} />
						<span>{isPreviousAvailable || !settings.quiz.random ? 'Předchozí' : 'Zpět'}</span>
					</button>
					<button onClick={addFileToCompleted} className='control-button complete-button'>
						<Icon icon='mdi:checkbox-marked-circle-outline' />
						<span>Naučeno</span>
					</button>
					<button className='control-button' onClick={() => toggleFileNameRevealed()}>
						<Icon icon={'mdi:eye' + (isFileNameRevealed ? '-off' : '')} />
						<span>{isFileNameRevealed ? 'Skrýt název' : 'Ukázat název'}</span>
					</button>
					<button onClick={() => changeImage()} className='control-button'>
						<Icon icon={settings.quiz.random ? 'mdi:image-refresh' : 'mdi:image-move'} />
						<span>{settings.quiz.random ? 'Vygenerovat nový obrázek' : 'Další obrázek'}</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default QuizControlPanel;
