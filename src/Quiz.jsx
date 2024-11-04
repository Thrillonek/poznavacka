import { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import { set } from './utilities.js';

function Quiz({ poznavacka }) {
	const [show, setShow] = useState();
	const [name, setName] = useState();
	const [min, setMin] = useState('1');
	const [max, setMax] = useState('');
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();
	const [mode, setMode] = useState('custom');
	const [presets, setPresets] = useState([]);
	const [random, setRandom] = useState(true);

	let files = set[poznavacka];

	let fileOptions = useRef({ first: [], second: [], recent: [], change: true, previous: [] });
	let presetLength = useRef();
	let prevIdx = useRef();

	useEffect(() => {
		if (index.number) setName(files[index.number - 1]);
	}, [index?.number]);

	useEffect(() => {
		if (poznavacka) {
			presetLength.current = [];
			for (let i = 1; i <= Math.floor(files.length / 10); i++) {
				presetLength.current.push(i);
			}
		}
		setMax(files.length);
		changeImg({ firstChange: true });
		fileOptions.current.change = true;

		return () => document.querySelector(':root').style.setProperty('--settings-scale', 0);
	}, [poznavacka]);

	useEffect(() => {
		document.body.onkeydown = (e) => {
			if (e.key == 'ArrowUp') {
				changeImg({ show: false });
			}
			if (e.key == 'ArrowDown') {
				setShow((prev) => (prev ? false : true));
			}
		};

		fileOptions.current.change = true;
	}, [min, max, presets, random]);

	const handleChangeMinMax = (e, setState) => !isNaN(e.target.value) && e.target.value.length <= 3 && setState(e.target.value);

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

		let minInt = mode == 'custom' ? parseInt(min) || 1 : 1;
		let maxInt = mode == 'custom' ? parseInt(max) || files.length : presets.length * 10;

		if (minInt == 69 && maxInt == 172) {
			document.getElementById('jumpscare').animate({ transform: ['scale(0)', 'scale(.5)', 'scale(.6)', 'scale(.6)', 'scale(5)'] }, { duration: 1000 });
		}

		setError(null);
		if (mode == 'custom') {
			if (maxInt <= minInt || (!max && minInt >= files?.length) || (!min && maxInt < 1)) return setError('Dolní hranice musí být nižší než ta horní');
			if (minInt < 1) return setError('Dolní hranice nemůže být nižší než 1');
			if (!options.firstChange && maxInt > files.length) return setError('Horní hranice nemůže být vyšší než ' + files.length);
		} else if (mode == 'preset') {
			if (presets.length == 0) {
				minInt = 1;
				maxInt = files.length;
			}
		}

		let idx;

			if (random) {
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

		if (mode == 'preset' && presets.length != 0) idx = presets[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];

if (fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] == index.number) {
			idx = fileOptions.current.previous[1];
		} else {
if (fileOptions.current.previous.length >= 2) fileOptions.current.previous.shift();
				fileOptions.current.previous?.push(idx);
}

		setIndex({ number: idx + 1, imgLoaded: false });
	}

	function togglePreset(num) {
		let presetsBuffer = [...presets];
		let presetArray = [];
		for (let i = num * 10 - 10; i <= num * 10 - 1; i++) {
			presetArray.push(i);
		}
		let presetIdx = presets.findIndex((el) => el[9] == num * 10 - 1);
		if (presetIdx == -1) {
			presetsBuffer.push(presetArray);
			setPresets(presetsBuffer);
		} else {
			presetsBuffer.splice(presetIdx, 1);
			setPresets(presetsBuffer);
		}
		presetsBuffer.sort((a, b) => a[0] - b[0]);
		setPresets(presetsBuffer);
	}

	function checkAllPresets() {
		if (presets.length !== Math.round(files.length / 10)) {
			let newPresets = [];
			for (let i = 0; i < Math.round(files.length / 10); i++) {
				let newPreset = [];
				for (let j = 1; j <= 10; j++) {
					newPreset.push(j + i * 10 - 1);
				}
				newPresets.push(newPreset);
			}
			setPresets(newPresets);
		} else setPresets([]);
	}

	function showPrev() {
		if (fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] + 1 != index.number) {
			setIndex({ number: fileOptions.current.previous[0] + 1, imgLoaded: false });
		}
	}

	function handleClick(e) {
		const rect = document.querySelector('#quiz-settings').getBoundingClientRect();
		const clientX = e.clientX || e.touches[0].clientX;
		const clientY = e.clientY || e.touches[0].clientY;
		const showSettings = document.querySelector('#show-quiz-settings');
		if ((clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) || e.target == showSettings || showSettings.contains(e.target)) return;
		document.querySelector(':root').style.setProperty('--settings-scale', 0);
	}

	function setToTested() {
		if (poznavacka == 'houby') return;
		setMin('1');
		setMax('70');
	}

	let readableImgName = name
		?.substring(0, name.lastIndexOf('.'))
		.replaceAll(/[0-9+]/g, '')
		.replace('-', ' - ');

	return (
		<div onClick={handleClick} className='flex flex-col justify-between items-center bg-[--bg-main] py-5 w-full h-full'>
			<button id='show-quiz-settings' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 1)} className='top-4 max-sm:top-1 right-6 absolute px-3 py-2'>
				<i className='text-[--text-main] text-3xl max-sm:text-2xl fa-gear fa-solid'></i>
			</button>
			<div className='flex flex-col justify-end items-center mt-16 px-2 w-full h-2/3'>
				<img onLoad={() => setIndex((prev) => ({ ...prev, imgLoaded: true }))} className='mb-10 rounded h-[90%] object-contain' src={('./assets/' + poznavacka + '/' + name).replace(' ', '%20').replace('+', '%2b')} />
				<div className={error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl'}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? readableImgName.charAt(0).toUpperCase() + readableImgName.slice(1) : index.number}</div>
			</div>
			<div id='quiz-settings' className='top-1/2 z-10 absolute flex flex-col justify-between items-center border-[--bg-secondary] bg-[--bg-main] shadow-[0_0_20px_5px_rgb(0,0,0,0.3)] px-3 pb-5 border rounded-xl w-[90%] lg:w-1/2 h-[85%] origin-top-right transition-transform -translate-y-1/2 duration-300 scale-[--settings-scale]'>
				<button className='top-2 right-3 absolute px-3 py-2' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 0)}>
					<i className='text-[--text-main] text-2xl fa-solid fa-xmark'></i>
				</button>
				<div className='flex flex-col items-center mt-10 w-full'>
					<h2 className='text-[--text-bright] mt-4 mb-2 text-lg'>Generovat obrázky</h2>
					<div className='relative bg-[--bg-bright] flex justify-between shadow-[0_0_20px_0_rgb(0,0,0,0.3)] p-1 rounded-lg w-3/4 max-[450px]:w-full md:w-1/2'>
						<div className={'top-0 left-0 z-0 absolute bg-blue-500 m-1 rounded w-[calc(50%-.5rem)] h-[calc(100%-.5rem)] transition-transform ' + (!random && 'translate-x-[calc(100%+.5rem)]')} />
						<button onClick={(e) => setRandom(true)} className={'w-1/2 z-10 text-[--text-main] rounded ' + (random && '!text-gray-100 font-semibold')}>
							Náhodně
						</button>
						<button onClick={(e) => setRandom(false)} className={'w-1/2 z-10 text-[--text-main] rounded py-1 ' + (!random && '!text-white font-semibold')}>
							Postupně
						</button>
					</div>
					<h2 className='text-[--text-bright] mt-4 mb-2 text-lg'>Nastavení</h2>
					<div className='relative bg-[--bg-bright] flex justify-between shadow-[0_0_20px_0_rgb(0,0,0,0.3)] p-1 rounded-lg w-3/4 max-[450px]:w-full md:w-1/2'>
						<div className={'top-0 left-0 z-0 absolute bg-blue-500 m-1 rounded w-[calc(50%-.5rem)] h-[calc(100%-.5rem)] transition-transform ' + (mode == 'preset' && 'translate-x-[calc(100%+.5rem)]')} />
						<button onClick={(e) => setMode('custom')} className={'w-1/2 z-10 text-[--text-main] rounded py-1 ' + (mode == 'custom' && '!text-white font-semibold')}>
							Vlastní
						</button>
						<button onClick={(e) => setMode('preset')} className={'w-1/2 z-10 text-[--text-main] rounded ' + (mode == 'preset' && '!text-gray-100 font-semibold')}>
							Předvolby
						</button>
					</div>
				</div>
				{mode == 'custom' && (
					<div className='flex flex-col justify-center items-center h-2/3'>
						<p className='text-[--text-bright] font-bold text-xl'>
							{poznavacka.charAt(0).toUpperCase() + poznavacka.slice(1)} od
							<input className='bg-[--bg-bright] caret-[--bg-secondary] mx-1 p-1 rounded w-12 text-[--text-main] outline-none' type='text' onChange={(e) => handleChangeMinMax(e, setMin)} value={min} />
							do
							<input className='bg-[--bg-bright] caret-[--bg-secondary] ml-1 p-1 rounded w-12 text-[--text-main] outline-none' type='text' onChange={(e) => handleChangeMinMax(e, setMax)} value={max} />
						</p>
						{/* <button onClick={setToTested} className='bg-gray-600 shadow-[0_0_10px_0_rgb(0,0,0,0.3)] mt-10 px-5 py-1 rounded-xl text-gray-300'>
							Nastavit na momentálně zkoušenou sadu
						</button> */}
					</div>
				)}
				{mode == 'preset' && (
					<div className='flex flex-col items-center'>
						<button onClick={checkAllPresets} className='text-[--text-bright] border-white bg-white bg-opacity-5 px-2 py-1 border border-b-0 border-opacity-10 rounded-t-lg'>
							Zaškrtnout všechno
						</button>
						<div className='grid grid-cols-3 bg-[--bg-main] shadow-[0_0_10px_5px_rgb(0,0,0,0.3)] p-px rounded overflow-hidden'>
							{presetLength.current.map((num) => {
								let isChecked = presets?.some((p) => p[9] == num * 10 - 1);
								return (
									<button key={num} onClick={(e) => togglePreset(num)} className={'flex items-center px-3 py-[0.6rem] ' + (isChecked && 'bg-white bg-opacity-5')}>
										<span className={'flex justify-center items-center bg-[--text-main] rounded w-3 h-3 ' + (isChecked && '!bg-gray-600 shadow-[0_0_15px_0_rgb(0,0,0,0.2)]')}>{isChecked && <i className='text-[--text-main] text-sm fa-check fa-solid scale-75' />}</span>
										<p className={'ml-1 ' + (isChecked ? 'text-[--text-bright]' : 'text-[--text-main]')}>
											{num != 1 && num - 1}1-{num}0
										</p>
									</button>
								);
							})}
						</div>
					</div>
				)}
				<span className='mb-5 p-2 text-[--text-main] text-center text-lg phone-invisible'>
					<h2 className='text-[--text-bright] font-semibold text-lg'>TIP:</h2>
					<br />
					Stiskni klávesu <i className='text-[--text-bright] font-semibold fa-caret-square-up fa-solid' /> pro změnu rostliny
					<br />
					a klávesu <i className='text-[--text-bright] font-semibold fa-caret-square-down fa-solid' /> pro název rostliny
				</span>
			</div>
			<div className='gap-2 grid grid-cols-2 grid-rows-2 mb-8 w-[80%] md:w-1/2 xl:w-1/3'>
				<button onClick={showPrev} className={'text-[--text-bright] to-[--bg-bright] bg-gradient-to-b from-[--bg-secondary] shadow-round mx-1 py-1 rounded-lg font-bold text-lg outline-none ' + (!(fileOptions.current.previous.length > 1 && fileOptions.current.previous[0] + 1 != index.number) && 'brightness-75 cursor-default')}>
					Předchozí
				</button>
				<button onClick={() => changeImg({ show: false })} className='text-[--text-bright] to-[--bg-bright] bg-gradient-to-b from-[--bg-secondary] shadow-round mx-1 py-1 rounded-lg font-bold text-lg outline-none'>
					Další
				</button>
				<button className='text-[--text-bright] to-[--bg-bright] col-span-2 bg-gradient-to-b from-[--bg-secondary] shadow-round mx-1 py-1 rounded-lg font-bold text-lg outline-none' onClick={(e) => setShow((prev) => (prev ? false : true))}>
					{show ? 'Skrýt' : 'Odhalit'} název
				</button>
			</div>
		</div>
	);
}

export default Quiz;
