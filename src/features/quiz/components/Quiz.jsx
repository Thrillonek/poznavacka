import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getGroupName, isObject, nameFromPath } from 'src/utils';
import '../assets/_Quiz.scss';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { didPoznavackaChange, fileIndexHistory, previousFiles } from '../data/variables';
import { changeImage } from '../utils/changeImage';

function Quiz() {
	// const [isNameRevealed, setIsNameRevealed] = useState();
	// const [fileName, setFileName] = useState();
	// const [fileIndex, setFileIndex] = useState({ number: null, imgLoaded: false });

	const error = useQuizErrorStore((store) => store.error);
	const { fileIndex, fileName, isFileLoaded, isFileNameRevealed, setFileIndex, completeFileLoading, toggleFileNameRevealed } = useQuizFileStore((store) => store);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	let files = Object.values(poznavacka)[0].filter((f) => !isObject(f));

	let prevIdx = useRef();

	useEffect(() => {
		didPoznavackaChange.current = true;
		changeImage({ firstChange: true });
	}, [poznavacka, settings.quiz, settings.removeDuplicates]);

	function handleKeyDown(e) {
		if (e.key == settings.keybinds.change) {
			changeImage({ show: false });
		}
		if (e.key == settings.keybinds.reveal) {
			toggleFileNameRevealed();
		}
		if (e.key == settings.keybinds.complete) {
			completeImg();
		}
	}

	let previousAvailable = previousFiles.length > 1 && previousFiles[0] != fileIndex;

	function showPrev() {
		if (settings.quiz.random) {
			if (!(previousFiles.length > 1)) return;
			if (previousAvailable) {
				setFileIndex(previousFiles[0]);
			} else {
				setFileIndex(previousFiles[1]);
			}
		} else {
			// let minInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.min) || 1 : 1;
			// let maxInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.max) || files.length : settings?.quiz.presets.length * 10;
			// let idx;
			// if (prevIdx.current == null || prevIdx.current <= minInt - 1) {
			// 	idx = maxInt - 1;
			// } else {
			// 	idx = prevIdx.current - 1;
			// }
			// prevIdx.current = idx;
			// try {
			// 	if (settings?.quiz.mode == 'preset' && settings?.quiz.presets.length != 0) idx = settings?.quiz.presets?.[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];
			// } catch (e) {
			// 	console.log(e);
			// }ˇ
			let idx;
			if (prevIdx.current == null || prevIdx.current == 0) {
				idx = fileIndexHistory.main.length - 1;
			} else {
				idx = prevIdx.current - 1;
			}
			prevIdx.current = idx;
			idx = fileIndexHistory.main[idx];
			setFileIndex(idx);
		}
	}

	function completeImg() {
		let idx = fileIndexHistory.recent.indexOf(fileIndex);
		if (idx == -1) idx = fileIndexHistory.main.indexOf(fileIndex);
		if (fileIndexHistory.recent.includes(fileIndex)) {
			fileIndexHistory.recent.splice(idx, 1);
		} else fileIndexHistory.main.splice(idx, 1);
		// fileHistory.recent.splice(idx, 1);
		settings.quiz?.complete.push(files[fileIndex - 1]);
		changeImage({ show: false, complete: true });
		// console.log(fileOptions.current, settings.quiz.complete);
	}

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
					<button text={previousAvailable || !settings.quiz.random ? 'Předchozí' : 'Zpět'} onClick={showPrev} className={'control-btn ' + (!(previousFiles.length > 1) ? 'control-btn-disabled' : '')}>
						<Icon icon='tabler:reload' className={previousAvailable || !settings.quiz.random ? 'mb-5 -scale-x-100' : ''} />
					</button>
				</div>
				<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl h-18 overflow-hidden'>
					<button text={isFileNameRevealed ? 'Skryt' : 'Zobrazit'} className='control-btn' onClick={() => toggleFileNameRevealed()}>
						{isFileNameRevealed ? <Icon icon='mdi:eye-off' /> : <Icon icon='mdi:eye' />}
					</button>
					<div className='bg-neutral-600 w-px h-2/3'></div>
					<button text={settings.quiz.random ? 'Generovat' : 'Další'} onClick={() => changeImage({ show: false })} className='control-btn'>
						{settings.quiz.random ? <Icon icon='ion:dice' /> : <Icon icon='material-symbols:chevron-right-rounded' className='text-[1.5em]' />}
					</button>
					<div className='bg-neutral-600 w-px h-2/3'></div>
					<button text='Naučeno' onClick={completeImg} className='control-btn'>
						<Icon icon='material-symbols:check-circle-rounded' />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
