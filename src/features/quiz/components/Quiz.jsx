import { Icon } from '@iconify/react';
import { useEffect, useRef } from 'react';
import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getGroupName, isObject, nameFromPath } from 'src/utils';
import '../assets/_Quiz.scss';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { previousFiles } from '../data/variables';
import { addFileToCompleted, changeImage, initiateQuiz, showPreviousFile } from '../utils';

function Quiz() {
	const error = useQuizErrorStore((store) => store.error);
	const { fileIndex, fileName, isFileLoaded, isFileNameRevealed, setFileIndex, completeFileLoading, toggleFileNameRevealed } = useQuizFileStore((store) => store);

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

	let isPreviousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0} className='justify-items-center grid grid-rows-8 bg-neutral-800 px-2 py-2 md:py-8 outline-none w-full h-full'>
			{/* <button id='show-quiz-settings' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 1)} className='top-4 max-sm:top-1 right-6 absolute px-3 py-2'>
				<i className='text-[--text-main] max-sm:text-2xl text-3xl fa-gear fa-solid'></i>
			</button> */}
			<div className='flex justify-center row-span-4 w-full'>
				<img onLoad={completeFileLoading} className='rounded max-w-full h-full max-h-full object-contain overflow-hidden' src={fileName?.replace(' ', '%20').replace('+', '%2b')} />
			</div>
			<div className='row-span-1 mt-auto h-20'>
				<div className={error ? 'text-red-400 text-lg' : 'text-white text-center font-semibold text-2xl'}>
					{error ? (
						error
					) : !isFileLoaded ? (
						'Načítání...'
					) : isFileNameRevealed ? (
						<>
							{nameFromPath(fileName)}
							{Object.keys(poznavacka)[0] == 'hmyz' && (
								<>
									<br />
									<p className='font-normal text-lg'>Řád: {getGroupName(fileIndex - 1, insectGroupNames)}</p>
								</>
							)}
						</>
					) : (
						settings.devMode && fileIndex
					)}
				</div>
			</div>
			<div className='flex max-md:flex-col max-md:items-center gap-4 md:gap-8 row-span-3 mx-auto mt-auto'>
				<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl w-fit overflow-hidden'>
					<button text={isPreviousAvailable || !settings.quiz.random ? 'Předchozí' : 'Zpět'} onClick={showPreviousFile} className={'control-btn ' + (!(previousFiles.length > 1) ? 'control-btn-disabled' : '')}>
						<Icon icon='tabler:reload' className={isPreviousAvailable || !settings.quiz.random ? 'mb-5 -scale-x-100' : ''} />
					</button>
				</div>
				<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl h-18 overflow-hidden'>
					<button text={isFileNameRevealed ? 'Skryt' : 'Zobrazit'} className='control-btn' onClick={() => toggleFileNameRevealed()}>
						{isFileNameRevealed ? <Icon icon='mdi:eye-off' /> : <Icon icon='mdi:eye' />}
					</button>
					<div className='bg-neutral-600 w-px h-2/3'></div>
					<button text={settings.quiz.random ? 'Generovat' : 'Další'} onClick={changeImage} className='control-btn'>
						{settings.quiz.random ? <Icon icon='ion:dice' /> : <Icon icon='material-symbols:chevron-right-rounded' className='text-[1.5em]' />}
					</button>
					<div className='bg-neutral-600 w-px h-2/3'></div>
					<button text='Naučeno' onClick={addFileToCompleted} className='control-btn'>
						<Icon icon='material-symbols:check-circle-rounded' />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
