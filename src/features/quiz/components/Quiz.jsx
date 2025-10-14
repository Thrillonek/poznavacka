import { Icon } from '@iconify/react';
import { use, useEffect, useRef, useState } from 'react';
import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getGroupName, isObject, nameFromPath } from 'src/utils';
import '../assets/_Quiz.scss';
import { fileHistory } from '../data/variables';
import { betterRNG } from '../utils/betterRNG';

function Quiz() {
	const [isNameRevealed, setIsNameRevealed] = useState();
	const [fileName, setFileName] = useState();
	const [fileIndex, setFileIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	let files = Object.values(poznavacka)[0].filter((f) => !isObject(f));

	let fileOptions = useRef({ change: true, previous: [] });
	let prevIdx = useRef();
	let completedAmount = useRef(0);

	useEffect(() => {
		if (fileIndex.number) setFileName(files[fileIndex.number - 1]);
	}, [fileIndex?.number]);

	useEffect(() => {
		fileOptions.current.change = true;
		changeImg({ firstChange: true });
	}, [poznavacka, settings.quiz, settings.removeDuplicates]);

	function handleKeyDown(e) {
		if (e.key == settings.keybinds.change) {
			changeImg({ show: false });
		}
		if (e.key == settings.keybinds.reveal) {
			setIsNameRevealed((prev) => (prev ? false : true));
		}
		if (e.key == settings.keybinds.complete) {
			completeImg();
		}
	}

	function changeImg(options) {
		options?.show != undefined && setIsNameRevealed(options.show);

		let minInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.min) || 1 : 1;
		let maxInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.max) || files.length : settings?.quiz.presets.length * 10;

		let range = maxInt - minInt + 1;

		if (fileOptions.current.change) {
			fileHistory.recent = [];
			fileHistory.main = [];
			if (settings.quiz.mode == 'custom') {
				for (let i = 1; i <= range; i++) {
					let val = i + minInt - 1;
					if (settings.quiz.complete?.includes(files[val - 1])) continue;
					fileHistory.main.push(val);
				}
			} else if (settings.quiz.mode == 'preset') {
				for (let i of settings?.quiz.presets) {
					for (let val = (i - 1) * 10 + 1; val <= i * 10; val++) {
						if (settings.quiz.complete?.includes(files[val - 1])) continue;
						fileHistory.main.push(val);
					}
				}
			}
		}

		setError(null);
		if (settings?.quiz.mode == 'custom') {
			if (maxInt <= minInt || (!settings?.quiz.max && minInt >= files?.length) || (!settings?.quiz.min && maxInt < 1)) return setError('Dolní hranice musí být nižší než ta horní');
			if (minInt < 1) return setError('Dolní hranice nemůže být nižší než 1');
			if (!options.firstChange && maxInt > files.length) return setError('Horní hranice nemůže být vyšší než ' + files.length);
		} else if (settings?.quiz.mode == 'preset') {
			if (settings?.quiz.presets.length == 0) {
				minInt = 1;
				maxInt = files.length;
			}
		}

		let idx;

		// if (fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] + 1 == index.number) {
		// 	idx = fileOptions.current.previous[1];
		// } else {
		if (fileHistory.main.length + fileHistory.recent.length == 0) return setError('V této sadě už nic nezbylo.');
		if (settings?.quiz.random) {
			idx = betterRNG(minInt, maxInt);
		} else {
			if (prevIdx.current == null || prevIdx.current >= fileHistory.main.length - (options.complete ? 0 : 1) || fileOptions.current.change) {
				idx = 0;
			} else {
				// console.log(prevIdx.current);
				idx = prevIdx.current + (options.complete ? 0 : 1);
			}
			// while (settings.quiz?.complete.includes(fileHistory.main[idx])) {
			// 	if (idx == range - 1) {
			// 		idx = 0;
			// 	} else {
			// 		idx++;
			// 	}
			// }
			prevIdx.current = idx;
			idx = fileHistory.main[idx];
		}

		// try {
		// 	if (settings?.quiz.mode == 'preset' && settings?.quiz.presets.length != 0) idx = settings?.quiz.presets?.[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];
		// } catch (e) {
		// 	console.log(e);
		// }

		if (fileOptions.current.previous.length >= 2) fileOptions.current.previous.shift();
		fileOptions.current.previous?.push(idx);

		if (fileOptions.current.change) {
			fileOptions.current.change = false;
		}

		setFileIndex({ number: idx, imgLoaded: false });
	}

	let previousAvailable = fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] != fileIndex.number;

	function showPrev() {
		if (settings.quiz.random) {
			if (!(fileOptions.current.previous.length > 1)) return;
			if (previousAvailable) {
				setFileIndex({ number: fileOptions.current.previous[0], imgLoaded: false });
			} else {
				setFileIndex({ number: fileOptions.current.previous[1], imgLoaded: false });
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
				idx = fileHistory.main.length - 1;
			} else {
				idx = prevIdx.current - 1;
			}
			prevIdx.current = idx;
			idx = fileHistory.main[idx];
			setFileIndex({ number: idx, imgLoaded: false });
		}
	}

	function completeImg() {
		let idx = fileHistory.recent.indexOf(fileIndex.number);
		if (idx == -1) idx = fileHistory.main.indexOf(fileIndex.number);
		if (fileHistory.recent.includes(fileIndex.number)) {
			fileHistory.recent.splice(idx, 1);
		} else fileHistory.main.splice(idx, 1);
		// fileHistory.recent.splice(idx, 1);
		settings.quiz?.complete.push(files[fileIndex.number - 1]);
		changeImg({ show: false, complete: true });
		// console.log(fileOptions.current, settings.quiz.complete);
	}

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0} className='justify-items-center grid grid-rows-8 bg-neutral-800 px-2 py-2 md:py-8 outline-none w-full h-full'>
			{/* <button id='show-quiz-settings' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 1)} className='top-4 max-sm:top-1 right-6 absolute px-3 py-2'>
				<i className='text-[--text-main] max-sm:text-2xl text-3xl fa-gear fa-solid'></i>
			</button> */}
			<div className='flex justify-center row-span-4 w-full'>
				<img onLoad={() => setFileIndex((prev) => ({ ...prev, imgLoaded: true }))} className='rounded max-w-full h-full max-h-full object-contain overflow-hidden' src={fileName?.replace(' ', '%20').replace('+', '%2b')} />
			</div>
			<div className='row-span-1 mt-auto h-20'>
				<div className={error ? 'text-red-400 text-lg' : 'text-white text-center font-semibold text-2xl'}>
					{error ? (
						error
					) : !fileIndex.imgLoaded ? (
						'Načítání...'
					) : isNameRevealed ? (
						<>
							{nameFromPath(fileName)}
							{Object.keys(poznavacka)[0] == 'hmyz' && (
								<>
									<br />
									<p className='font-normal text-lg'>Řád: {getGroupName(fileIndex.number - 1, insectGroupNames)}</p>
								</>
							)}
						</>
					) : (
						settings.devMode && fileIndex.number
					)}
				</div>
			</div>
			<div className='flex max-md:flex-col max-md:items-center gap-4 md:gap-8 row-span-3 mx-auto mt-auto'>
				<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl w-fit overflow-hidden'>
					<button text={previousAvailable || !settings.quiz.random ? 'Předchozí' : 'Zpět'} onClick={showPrev} className={'control-btn ' + (!(fileOptions.current.previous.length > 1) ? 'control-btn-disabled' : '')}>
						<Icon icon='tabler:reload' className={previousAvailable || !settings.quiz.random ? 'mb-5 -scale-x-100' : ''} />
					</button>
				</div>
				<div className='place-items-center grid grid-flow-col bg-neutral-700 rounded-xl h-18 overflow-hidden'>
					<button text={isNameRevealed ? 'Skryt' : 'Zobrazit'} className='control-btn' onClick={(e) => setIsNameRevealed((prev) => (prev ? false : true))}>
						{isNameRevealed ? <Icon icon='mdi:eye-off' /> : <Icon icon='mdi:eye' />}
					</button>
					<div className='bg-neutral-600 w-px h-2/3'></div>
					<button text={settings.quiz.random ? 'Generovat' : 'Další'} onClick={() => changeImg({ show: false })} className='control-btn'>
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
