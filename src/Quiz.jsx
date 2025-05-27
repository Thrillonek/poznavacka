import { Icon } from '@iconify/react';
import { use, useEffect, useRef, useState } from 'react';
import './Quiz.css';
import { calculateOrderName, dir, isObject, nameFromPath, orderNames, settings } from './utilities.js';

function Quiz({ poznavacka }) {
	const [show, setShow] = useState();
	const [name, setName] = useState();
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();

	let files = Object.values(poznavacka)[0].filter((f) => !isObject(f));

	let fileOptions = useRef({ main: [], recent: [], change: true, previous: [] });
	let prevIdx = useRef();

	useEffect(() => {
		if (index.number) setName(files[index.number - 1]);
	}, [index?.number]);

	useEffect(() => {
		fileOptions.current.change = true;
		changeImg({ firstChange: true });
	}, [poznavacka, settings.quiz, settings.removeDuplicates]);

	/* KLÁVESNICE TLAČÍTKA */
	function handleKeyDown(e) {
		if (e.key == settings.keybinds.change) {
			changeImg({ show: false });
		}
		if (e.key == settings.keybinds.reveal) {
			setShow((prev) => (prev ? false : true));
		}
		if (e.key == settings.keybinds.complete) {
			completeImg();
		}
	}

	function generateIdx(minVal, maxVal) {
		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		let options = fileOptions.current;

		let range = maxVal - minVal + 1;
		let idx = rng(0, options.main.length - 1);
		let result = options.main[idx];

		options.recent.push(result);
		options.main.splice(idx, 1);

		let multiplier = range >= 5 ? 1.33 : 1;
		if (Math.floor((range - settings.quiz.complete.length) / multiplier) <= options.recent.length) {
			options.main.push(options.recent[0]);
			options.recent.shift();
		}

		return result;
	}

	function changeImg(options) {
		options?.show != undefined && setShow(options.show);

		let minInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.min) || 1 : 1;
		let maxInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.max) || files.length : settings?.quiz.presets.length * 10;

		let range = maxInt - minInt + 1;

		if (fileOptions.current.change) {
			fileOptions.current.recent = [];
			fileOptions.current.main = [];
			if (settings.quiz.mode == 'custom') {
				for (let i = 1; i <= range; i++) {
					let val = i + minInt - 1;
					if (settings.quiz.complete?.includes(files[val - 1])) continue;
					fileOptions.current.main.push(val);
				}
			} else if (settings.quiz.mode == 'preset') {
				for (let i of settings?.quiz.presets) {
					for (let val = (i - 1) * 10 + 1; val <= i * 10; val++) {
						if (settings.quiz.complete?.includes(files[val - 1])) continue;
						fileOptions.current.main.push(val);
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
		if (fileOptions.current.main.length + fileOptions.current.recent.length == 0) return setError('V této sadě už nic nezbylo.');
		if (settings?.quiz.random) {
			idx = generateIdx(minInt, maxInt);
		} else {
			if (prevIdx.current == null || prevIdx.current >= fileOptions.current.main.length - (options.complete ? 0 : 1) || fileOptions.current.change) {
				idx = 0;
			} else {
				// console.log(prevIdx.current);
				idx = prevIdx.current + (options.complete ? 0 : 1);
			}
			// while (settings.quiz?.complete.includes(fileOptions.current.main[idx])) {
			// 	if (idx == range - 1) {
			// 		idx = 0;
			// 	} else {
			// 		idx++;
			// 	}
			// }
			prevIdx.current = idx;
			idx = fileOptions.current.main[idx];
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

		setIndex({ number: idx, imgLoaded: false });
	}

	let previousAvailable = fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] != index.number;

	function showPrev() {
		if (settings.quiz.random) {
			if (!(fileOptions.current.previous.length > 1)) return;
			if (previousAvailable) {
				setIndex({ number: fileOptions.current.previous[0], imgLoaded: false });
			} else {
				setIndex({ number: fileOptions.current.previous[1], imgLoaded: false });
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
				idx = fileOptions.current.main.length - 1;
			} else {
				idx = prevIdx.current - 1;
			}
			prevIdx.current = idx;
			idx = fileOptions.current.main[idx];
			setIndex({ number: idx, imgLoaded: false });
		}
	}

	function completeImg() {
		let idx = fileOptions.current.recent.indexOf(index.number);
		if (idx == -1) idx = fileOptions.current.main.indexOf(index.number);
		if (fileOptions.current.recent.includes(index.number)) {
			fileOptions.current.recent.splice(idx, 1);
		} else fileOptions.current.main.splice(idx, 1);
		// fileOptions.current.recent.splice(idx, 1);
		settings.quiz?.complete.push(files[index.number - 1]);
		changeImg({ show: false, complete: true });
		// console.log(fileOptions.current, settings.quiz.complete);
	}

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0} className='justify-items-center grid grid-rows-8 bg-neutral-800 px-2 py-2 md:py-8 outline-none w-full h-full'>
			{/* <button id='show-quiz-settings' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 1)} className='top-4 max-sm:top-1 right-6 absolute px-3 py-2'>
				<i className='text-[--text-main] max-sm:text-2xl text-3xl fa-gear fa-solid'></i>
			</button> */}
			<div className='flex justify-center row-span-4 w-full'>
				<img onLoad={() => setIndex((prev) => ({ ...prev, imgLoaded: true }))} className='rounded max-w-full h-full max-h-full object-contain overflow-hidden' src={name?.replace(' ', '%20').replace('+', '%2b')} />
			</div>
			<div className='row-span-1 mt-auto h-20'>
				<div className={error ? 'text-red-400 text-lg' : 'text-white text-center font-semibold text-2xl'}>
					{error ? (
						error
					) : !index.imgLoaded ? (
						'Načítání...'
					) : show ? (
						<>
							{nameFromPath(name)}
							{Object.keys(poznavacka)[0] == 'hmyz' && (
								<>
									<br />
									<p className='font-normal text-lg'>Řád: {calculateOrderName(index.number - 1, orderNames)}</p>
								</>
							)}
						</>
					) : (
						settings.devMode && index.number
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
					<button text={show ? 'Skryt' : 'Zobrazit'} className='control-btn' onClick={(e) => setShow((prev) => (prev ? false : true))}>
						{show ? <Icon icon='mdi:eye-off' /> : <Icon icon='mdi:eye' />}
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
