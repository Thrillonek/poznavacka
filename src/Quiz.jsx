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

	useEffect(() => {
		setMax(files.length);
		changeImg({ firstChange: true });
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
		if (presets.length !== 15) {
			let newPresets = [];
			for (let i = 0; i < 15; i++) {
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
		setMin('1');
		setMax('70');
	}

	let readableImgName = text
		?.split('.')[0]
		.replaceAll(/[0-9+]/g, '')
		.replace('-', ' - ');

	return (
		<div className='flex flex-col justify-between items-center bg-gray-700 w-full h-full'>
			<div className='flex flex-col justify-between items-center p-2 h-1/2'>
				<img onLoad={() => setIndex({ number: index.number, imgLoaded: true })} className='rounded h-full max-h-[90%] object-contain' src={('./assets/' + poznavacka + '/' + text).replace(' ', '%20').replace('+', '%2b')} />
				<div className={error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl'}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? readableImgName.charAt(0).toUpperCase() + readableImgName.slice(1) : index.number}</div>
			</div>
			<div className='flex flex-col justify-between items-center w-full h-1/2'>
				<div className='flex justify-between bg-gray-600 shadow-[0_0_20px_0_rgb(0,0,0,0.3)] mt-3 px-1 py-1 rounded-full w-2/3 md:w-1/3'>
					<button onClick={(e) => setMode('custom')} className={'border-[rgb(95,105,115)] w-1/2 ' + (mode == 'custom' ? 'text-white' : 'text-gray-400')}>
						Vlastní
					</button>
					<button onClick={(e) => setMode('preset')} className={'border-l-2 border-[rgb(95,105,115)] w-1/2 ' + (mode == 'preset' ? 'text-white' : 'text-gray-400')}>
						Předvolby
					</button>
				</div>
				{mode == 'custom' && (
					<div className='flex flex-col items-center'>
						<p className='font-bold text-gray-300 text-xl'>
							{poznavacka.charAt(0).toUpperCase() + poznavacka.slice(1)} od
							<input className='bg-gray-600 mx-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => handleChangeMinMax(e, setMin)} value={min} />
							do
							<input className='bg-gray-600 ml-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => handleChangeMinMax(e, setMax)} value={max} />
						</p>
						{poznavacka == 'rostliny' && (
							<button onClick={setToTested} className='bg-gray-600 shadow-[0_0_10px_0_rgb(0,0,0,0.3)] mt-6 px-5 py-1 rounded-xl text-gray-300'>
								Nastavit na momentálně zkoušenou sadu
							</button>
						)}
					</div>
				)}
				{mode == 'preset' && (
					<div className='flex flex-col items-center'>
						<button onClick={checkAllPresets} className='border-gray-600 bg-gray-600 bg-opacity-30 border border-b-0 rounded-t-lg w-1/2 text-gray-300 text-sm'>
							Zaškrtnout všechno
						</button>
						<div className='grid grid-cols-3 grid-rows-5 bg-gray-700 bg-opacity-30 shadow-[0_0_30px_0_rgb(0,0,0,0.3)] p-px rounded overflow-hidden'>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => {
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
				{/* <span className='md:block border-2 hidden mb-5 p-2 text-center text-gray-400 text-lg'>
					Stiskni klávesu <i className='font-semibold text-gray-300 fa-caret-square-up fa-solid' /> pro změnu rostliny
					<br />
					a klávesu <i className='font-semibold text-gray-300 fa-caret-square-down fa-solid' /> pro název rostliny
				</span> */}
				<div className='flex justify-between mb-8 w-2/3 md:w-1/2 xl:w-1/3'>
					<button onClick={(e) => changeImg({ show: false })} className='bg-gray-500 mx-1 py-1 rounded-lg w-[45%] font-semibold'>
						Změnit rostlinu
					</button>
					<button className='bg-gray-500 mx-1 py-1 rounded-lg w-[45%] font-semibold' onClick={(e) => setShow((prev) => (prev ? false : true))}>
						{show ? 'Skrýt' : 'Odhalit'} název
					</button>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
