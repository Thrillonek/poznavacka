import { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import { plants, shrooms } from './utilities.js';

function Quiz({ poznavacka }) {
	const [show, setShow] = useState();
	const [text, setText] = useState();
	const [min, setMin] = useState('1');
	const [max, setMax] = useState('');
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();
	const [mode, setMode] = useState('custom');
	const [presets, setPresets] = useState([]);

	let files = poznavacka == 'rostliny' ? plants : poznavacka == 'houby' ? shrooms : [];

	let forbiddenIdx = useRef([]);
	let prevIdx = useRef();
	let presetLength = useRef();

	useEffect(() => {
		if (poznavacka) {
			presetLength.current = [];
			for (let i = 1; i <= Math.floor(files.length / 10); i++) {
				presetLength.current.push(i);
			}
		}
		setMax(files.length);
		changeImg({ firstChange: true });

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
	}, [min, max, presets]);

	const handleChangeMinMax = (e, setState) => !isNaN(e.target.value) && e.target.value.length <= 3 && setState(e.target.value);

	function generateIdx(minValue, maxValue) {
		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		let idx = rng(minValue - 1, maxValue - 1);
		let range = maxValue - minValue + 1;
		let mid = Math.ceil(range / 2 + minValue - 1);
		let adjustment = mid > idx ? 1 : -1;

		if (Math.floor(range / 3) < forbiddenIdx.current.length) forbiddenIdx.current = [];

		while (forbiddenIdx.current.includes(idx)) {
			if (range < 3) break;
			idx += adjustment;
		}

		if (range == 2 && idx == prevIdx.current) idx == minValue - 1 ? idx++ : idx--;

		if (range >= 3 && forbiddenIdx.current.length >= Math.floor(range / 3)) forbiddenIdx.current.shift();
		forbiddenIdx.current.push(idx);

		return idx;
	}

	function changeImg(options) {
		options?.show != undefined && setShow(options.show);

		let minInt = mode == 'custom' ? parseInt(min) || 1 : 1;
		let maxInt = mode == 'custom' ? parseInt(max) || files.length : presets.length * 10;

		setError(null);
		if (mode == 'custom') {
			if (maxInt <= minInt || (!max && minInt >= files?.length) || (!min && maxInt < 1)) return setError('Dolní hranice musí být nižší než ta horní');
			if (minInt < 1) return setError('Dolní hranice nemůže být nižší než 1');
			if (!options.firstChange && maxInt > files.length) return setError('Horní hranice nemůže být vyšší než ' + files.length);
		} else if (mode == 'preset') {
			if (presets.length == 0) return setError('Zvol aspoň jednu předvolbu');
		}

		let idx = generateIdx(minInt, maxInt);

		if (mode == 'preset') idx = presets[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];

		setIndex({ number: idx + 1, imgLoaded: idx == prevIdx.current });

		let name = files[idx];
		setText(name);

		prevIdx.current = idx;
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
		if (presets.length !== Math.round(files.length /10)) {
			let newPresets = [];
			for (let i = 0; i < Math.round(files.length/10); i++) {
				let newPreset = [];
				for (let j = 1; j <= 10; j++) {
					newPreset.push(j + i * 10 - 1);
				}
				newPresets.push(newPreset);
			}
			setPresets(newPresets);
		} else setPresets([]);
	}

	function setToTested() {
		if (poznavacka == 'houby') return;
		setMin('1');
		setMax('70');
	}

	let readableImgName = text
		?.split('.')[0]
		.replaceAll(/[0-9+]/g, '')
		.replace('-', ' - ');

	return (
		<div className='flex flex-col justify-between items-center bg-gray-700 py-5 w-full h-full'>
			<button onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 1)} className='top-4 max-sm:top-1 right-6 absolute px-3 py-2'>
				<i className='text-3xl text-gray-400 max-sm:text-2xl fa-gear fa-solid'></i>
			</button>
			<div className='flex flex-col justify-end items-center mt-16 px-2 w-full h-2/3'>
				<img onLoad={() => setIndex({ number: index.number, imgLoaded: true })} className='mb-10 rounded h-[90%] object-contain' src={('./assets/' + poznavacka + '/' + text).replace(' ', '%20').replace('+', '%2b')} />
				<div className={error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl'}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? readableImgName.charAt(0).toUpperCase() + readableImgName.slice(1) : index.number}</div>
			</div>
			<div className='top-1/2 absolute flex flex-col justify-between items-center border-gray-500 bg-gray-700 shadow-[0_0_20px_5px_rgb(0,0,0,0.3)] px-3 pb-5 border rounded-xl w-[90%] lg:w-1/2 h-[95%] origin-top-right transition-transform -translate-y-1/2 duration-300 scale-[--settings-scale]'>
				<button className='top-2 right-3 absolute px-3 py-2' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 0)}>
					<i className='text-2xl text-gray-300 fa-solid fa-xmark'></i>
				</button>
				<div className='relative flex justify-between bg-gray-600 shadow-[0_0_20px_0_rgb(0,0,0,0.3)] mt-16 p-1 rounded-lg w-3/4 max-[400px]:w-full md:w-1/2'>
					<div className={'top-0 left-0 z-0 absolute bg-blue-500 m-1 rounded w-[calc(50%-.5rem)] h-[calc(100%-.5rem)] transition-transform ' + (mode == 'preset' && 'translate-x-[calc(100%+.5rem)]')} />
					<button onClick={(e) => setMode('custom')} className={'w-1/2 z-10 text-gray-400 rounded py-1 ' + (mode == 'custom' && '!text-white font-semibold')}>
						Vlastní
					</button>
					<button onClick={(e) => setMode('preset')} className={'w-1/2 z-10 text-gray-400 rounded ' + (mode == 'preset' && '!text-gray-100 font-semibold')}>
						Předvolby
					</button>
				</div>
				{mode == 'custom' && (
					<div className='flex flex-col justify-center items-center h-2/3'>
						<p className='font-bold text-gray-300 text-xl'>
							{poznavacka.charAt(0).toUpperCase() + poznavacka.slice(1)} od
							<input className='bg-gray-600 mx-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => handleChangeMinMax(e, setMin)} value={min} />
							do
							<input className='bg-gray-600 ml-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => handleChangeMinMax(e, setMax)} value={max} />
						</p>
						{/* <button onClick={setToTested} className='bg-gray-600 shadow-[0_0_10px_0_rgb(0,0,0,0.3)] mt-10 px-5 py-1 rounded-xl text-gray-300'>
							Nastavit na momentálně zkoušenou sadu
						</button> */}
					</div>
				)}
				{mode == 'preset' && (
					<div className='flex flex-col items-center'>
						<button onClick={checkAllPresets} className='border-gray-600 bg-gray-600 bg-opacity-30 px-2 py-1 border border-b-0 rounded-t-lg text-gray-300'>
							Zaškrtnout všechno
						</button>
						<div className='grid grid-cols-3 bg-gray-700 shadow-[0_0_10px_5px_rgb(0,0,0,0.3)] p-px rounded overflow-hidden'>
							{presetLength.current.map((num) => {
								let isChecked = presets?.some((p) => p[9] == num * 10 - 1);
								return (
									<button key={num} onClick={(e) => togglePreset(num)} className={'flex items-center px-3 py-[0.6rem] ' + (isChecked && 'bg-gray-500 bg-opacity-10')}>
										<span className={'flex justify-center items-center bg-gray-400 rounded w-3 h-3 ' + (isChecked && '!bg-gray-600 shadow-[0_0_15px_0_rgb(0,0,0,0.2)]')}>{isChecked && <i className='text-gray-400 text-sm fa-check fa-solid scale-75' />}</span>
										<p className={'ml-1 ' + (isChecked ? 'text-white' : 'text-gray-400')}>
											{num != 1 && num - 1}1-{num}0
										</p>
									</button>
								);
							})}
						</div>
					</div>
				)}
				<span className='mb-5 p-2 text-center text-gray-400 text-lg phone-invisible'>
					<h2 className='font-semibold text-gray-200 text-lg'>TIP:</h2>
					<br />
					Stiskni klávesu <i className='font-semibold text-gray-300 fa-caret-square-up fa-solid' /> pro změnu rostliny
					<br />
					a klávesu <i className='font-semibold text-gray-300 fa-caret-square-down fa-solid' /> pro název rostliny
				</span>
			</div>
			<div className='flex justify-between items-center mb-8 w-[80%] md:w-1/2 xl:w-1/3'>
				<button onClick={(e) => changeImg({ show: false })} className='bg-gray-500 mx-1 py-1 rounded-lg w-[45%] font-semibold text-gray-300'>
					Změnit
				</button>
				<button className='bg-gray-500 mx-1 py-1 rounded-lg w-[45%] font-semibold text-gray-300' onClick={(e) => setShow((prev) => (prev ? false : true))}>
					{show ? 'Skrýt' : 'Odhalit'} název
				</button>
			</div>
		</div>
	);
}

export default Quiz;
