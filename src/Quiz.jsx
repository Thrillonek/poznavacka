import { Icon } from '@iconify/react';
import { use, useEffect, useRef, useState } from 'react';
import './Quiz.css';
import { dir, isObject, nameFromPath } from './utilities.js';

function Quiz({ poznavacka, settings }) {
	const [show, setShow] = useState();
	const [name, setName] = useState();
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();

	let files = Object.values(poznavacka)[0].filter((f) => !isObject(f));

	let fileOptions = useRef({ first: [], second: [], recent: [], change: true, previous: [] });
	let prevIdx = useRef();

	useEffect(() => {
		if (index.number) setName(files[index.number - 1]);
	}, [index?.number]);

	useEffect(() => {
		changeImg({ firstChange: true });
		fileOptions.current.change = true;
	}, [poznavacka]);

	/* KLÁVESNICE TLAČÍTKA */
	function handleKeyDown(e) {
		if (e.key == settings.keybinds.change) {
			changeImg({ show: false });
		}
		if (e.key == settings.keybinds.reveal) {
			setShow((prev) => (prev ? false : true));
		}
	}

	useEffect(() => {
		console.log(fileOptions.current.previous);
	}, [fileOptions.current]);

	function generateIdx(minVal, maxVal) {
		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
		let options = fileOptions.current;

		let range = maxVal - minVal + 1;

		if (options.change) {
			options.recent = [];
			options.first = [];
			options.second = [];
			for (let i = 0; i < range; i++) {
				options.first.push(i + minVal - 1);
			}
			options.change = false;
		}

		let idx = rng(0, options.first.length - 1);
		let result = options.first[idx];

		if (Math.round(range / 2.5) <= options.recent.length) {
			options.second.push(options.recent[0]);
			options.recent.shift();
		}

		if (Math.round(range / 3) <= options.second.length) {
			options.first.push(options.second[0]);
			options.second.shift();
		}

		if (options.second.length > 0 && Math.random() * 4 > 3) {
			idx = rng(0, options.second.length - 1);
			result = options.second[idx];
			options.recent.push(options.second[idx]);
			options.second.splice(idx, 1);
		} else {
			options.recent.push(options.first[idx]);
			options.first.splice(idx, 1);
		}

		return result;
	}

	function changeImg(options) {
		options?.show != undefined && setShow(options.show);

		let minInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.min) || 1 : 1;
		let maxInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.max) || files.length : settings?.quiz.presets.length * 10;

		if (minInt == 69 && maxInt == 172) {
			document.getElementById('jumpscare').animate({ transform: ['scale(0)', 'scale(.5)', 'scale(.6)', 'scale(.6)', 'scale(5)'] }, { duration: 1000 });
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
		if (settings?.quiz.random) {
			idx = generateIdx(minInt, maxInt);
		} else {
			if (prevIdx.current == null || prevIdx.current == maxInt - 1 || fileOptions.current.change) {
				idx = minInt - 1;
				fileOptions.current.change = false;
				fileOptions.current.recent = [];
			} else {
				idx = prevIdx.current + 1;
			}
			prevIdx.current = idx;
		}
		if (settings?.quiz.mode == 'preset' && settings?.quiz.presets.length != 0) idx = settings?.quiz.presets[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];

		if (fileOptions.current.previous.length >= 2) fileOptions.current.previous.shift();
		fileOptions.current.previous?.push(idx);
		// }

		setIndex({ number: idx + 1, imgLoaded: false });
	}

	let previousAvailable = fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] + 1 != index.number;

	function showPrev() {
		if (!(fileOptions.current.previous.length > 1)) return;
		if (previousAvailable) {
			setIndex({ number: fileOptions.current.previous[0] + 1, imgLoaded: false });
		} else {
			setIndex({ number: fileOptions.current.previous[1] + 1, imgLoaded: false });
		}
	}

	// function handleClick(e) {
	// 	const rect = document.querySelector('#quiz-settings').getBoundingClientRect();
	// 	const clientX = e.clientX || e.touches[0].clientX;
	// 	const clientY = e.clientY || e.touches[0].clientY;
	// 	const showSettings = document.querySelector('#show-quiz-settings');
	// 	if ((clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) || e.target == showSettings || showSettings.contains(e.target)) return;
	// 	document.querySelector(':root').style.setProperty('--settings-scale', 0);
	// }

	function setToTested() {
		if (poznavacka == 'houby') return;
		setMin('1');
		setMax('70');
	}

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0} className='flex flex-col justify-center items-center gap-20 bg-neutral-800 px-2 outline-none w-full h-full'>
			{/* <button id='show-quiz-settings' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 1)} className='top-4 max-sm:top-1 right-6 absolute px-3 py-2'>
				<i className='text-[--text-main] max-sm:text-2xl text-3xl fa-gear fa-solid'></i>
			</button> */}
			<div className='justify-items-center gap-8 grid grid-rows-[1fr,1rem] w-full h-2/3'>
				<img onLoad={() => setIndex((prev) => ({ ...prev, imgLoaded: true }))} className='rounded max-w-full h-full max-h-full object-contain overflow-hidden' src={name?.replace(' ', '%20').replace('+', '%2b')} />
				<div className={error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl'}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? nameFromPath(name) : settings.devMode && index.number}</div>
			</div>
			<div className='flex gap-8'>
				<div className='bg-neutral-700 rounded-xl overflow-hidden'>
					<button text={previousAvailable ? 'Předchozí' : 'Zpět'} onClick={showPrev} className={'control-btn ' + (!(fileOptions.current.previous.length > 1) ? 'control-btn-disabled' : '')}>
						<Icon icon='tabler:reload' className={previousAvailable ? 'mb-5 -scale-x-100' : ''} />
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
				</div>
			</div>
		</div>
	);
}

export default Quiz;
