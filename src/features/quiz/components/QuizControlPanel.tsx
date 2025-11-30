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
		<div className='flex max-md:flex-col max-md:items-center gap-4 md:gap-8 row-span-3 mx-auto mt-auto'>
			<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl w-fit overflow-hidden'>
				<button data-text={isPreviousAvailable || !settings.quiz.random ? 'Předchozí' : 'Zpět'} onClick={showPreviousFile} className={'control-btn ' + (!(previousFiles.length > 1) ? 'control-btn-disabled' : '')}>
					<Icon icon='tabler:reload' className={isPreviousAvailable || !settings.quiz.random ? 'mb-5 -scale-x-100' : ''} />
				</button>
			</div>
			<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl h-18 overflow-hidden'>
				<button data-text={isFileNameRevealed ? 'Skryt' : 'Zobrazit'} className='control-btn' onClick={() => toggleFileNameRevealed()}>
					{isFileNameRevealed ? <Icon icon='mdi:eye-off' /> : <Icon icon='mdi:eye' />}
				</button>
				<div className='bg-neutral-600 w-px h-2/3'></div>
				<button data-text={settings.quiz.random ? 'Generovat' : 'Další'} onClick={() => changeImage()} className='control-btn'>
					{settings.quiz.random ? <Icon icon='ion:dice' /> : <Icon icon='material-symbols:chevron-right-rounded' className='text-[1.5em]' />}
				</button>
				<div className='bg-neutral-600 w-px h-2/3'></div>
				<button data-text='Naučeno' onClick={addFileToCompleted} className='control-btn'>
					<Icon icon='material-symbols:check-circle-rounded' />
				</button>
			</div>
		</div>
	);
}

export default QuizControlPanel;
