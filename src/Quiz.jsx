import { useEffect, useRef, useState } from 'react';
import './Quiz.css';

function Quiz() {
	const [show, setShow] = useState();
	const [text, setText] = useState();
	const [min, setMin] = useState('1');
	const [max, setMax] = useState('');
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();
	const [mode, setMode] = useState('custom');
	const [presets, setPresets] = useState([]);

	let forbiddenIdx = useRef([]);
	let prevIdx = useRef();
	let files = useRef(__FILES__);

	useEffect(() => {
		files.current.sort((a, b) => parseInt(a.replaceAll(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
		setMax(files.current.length);
		changeImg();
	}, []);

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

	function changeImg(options) {
		options?.show != undefined && setShow(options.show);

		let minInt = mode == 'custom' ? (parseInt(min) || 1) : 1;
		let maxInt = mode == 'custom' ? (parseInt(max) || files.current.length) : presets.length * 10;

		setError(null);
		if (mode == 'custom') {
			if (maxInt <= minInt || (!max && minInt >= files.current?.length) || (!min && maxInt < 1)) return setError('Dolní hranice musí být nižší než ta horní');
			if (minInt < 1) return setError('Dolní hranice nemůže být nižší než 1');
			if (maxInt > files.current.length) return setError('Horní hranice nemůže být vyšší než ' + files.current.length);
		} else if (mode == 'preset') {
			if (presets.length == 0) return setError('Zvol aspoň jednu předvolbu');
		}

		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		let idx = rng(minInt - 1, maxInt - 1);
		let range = maxInt - minInt + 1;
		let mid = Math.ceil(range / 2 + minInt - 1);
		let adjustment = mid > idx ? 1 : -1;

		if (Math.floor(range / 3) < forbiddenIdx.current.length) forbiddenIdx.current = [];

		while (forbiddenIdx.current.includes(idx)) {
			if (range < 3) break;
			idx += adjustment;
		}

		if (range == 2 && idx == prevIdx.current) idx == minInt - 1 ? idx++ : idx--;

		if (mode == 'preset') idx = presets[Math.floor(idx / 10)][idx - (Math.floor(idx / 10) * 10)];

		setIndex({ number: idx + 1, imgLoaded: idx == prevIdx.current });
		if (range >= 3 && forbiddenIdx.current.length >= Math.floor(range / 3)) forbiddenIdx.current.shift();
		forbiddenIdx.current.push(idx);

		let name = files.current[idx];
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

	let readableImgName = text
		?.split('.')[0]
		.replaceAll(/[0-9+]/g, '')
		.replace('-', ' - ');

	return (
		<div className='flex flex-col justify-between items-center bg-gray-700 w-full h-svh'>
			<div className='flex flex-col justify-between items-center p-2 h-1/2'>
				<img onLoad={() => setIndex({ number: index.number, imgLoaded: true })} className='rounded h-full max-h-[90%]' src={('./assets/img/' + text).replace(' ', '%20').replace('+', '%2b')} />
				<div className={error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl'}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? readableImgName.charAt(0).toUpperCase() + readableImgName.slice(1) : index.number}</div>
			</div>
			<div className='flex flex-col justify-between items-center w-full h-1/2'>
				<div className='flex justify-between bg-gray-600 mt-3 px-1 py-1 rounded-full w-2/3 md:w-1/3'>
					<button onClick={(e) => setMode('custom')} className={'border-[rgb(95,105,115)] w-1/2 ' + (mode == 'custom' ? 'text-white' : 'text-gray-400')}>
						Vlastní
					</button>
					<button onClick={(e) => setMode('preset')} className={'border-l-2 border-[rgb(95,105,115)] w-1/2 ' + (mode == 'preset' ? 'text-white' : 'text-gray-400')}>
						Předvolby
					</button>
				</div>
				{mode == 'custom' && (
					<p className='font-bold text-gray-300 text-xl'>
						Rostliny od
						<input className='bg-gray-600 mx-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => !isNaN(e.target.value) && setMin(e.target.value)} value={min} />
						do
						<input className='bg-gray-600 ml-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => !isNaN(e.target.value) && setMax(e.target.value)} value={max} />
					</p>
				)}
				{mode == 'preset' && (
					<div className='flex flex-col items-center'>
						<button onClick={checkAllPresets} className='bg-gray-800 bg-opacity-30 rounded-t-lg w-1/2 text-sm text-white'>
							Zaškrtnout všechno
						</button>
						<div className='grid grid-cols-3 grid-rows-5 bg-gray-800 bg-opacity-30 p-px rounded overflow-hidden'>
							{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((num) => {
								let isChecked = presets?.some((p) => p[9] == num * 10 - 1);
								return (
									<button key={num} onClick={(e) => togglePreset(num)} className={'flex items-center px-3 py-[0.6rem] ' + (isChecked && 'bg-gray-500 bg-opacity-10')}>
										<span className='flex justify-center items-center bg-gray-400 rounded w-3 h-3'>{isChecked && <i className='text-gray-600 text-sm fa-solid fa-square-check' />}</span>
										<p className={'ml-1 ' + (isChecked ? 'text-white' : 'text-gray-400')}>
											{num - 1}1-{num}0
										</p>
									</button>
								);
							})}
						</div>
					</div>
				)}
				<span className='md:block hidden mb-5 text-gray-500 text-lg'>
					<i className='fa-arrow-up font-semibold text-gray-400 fa-solid' /> pro změnu rostliny
					<br />
					<i className='fa-arrow-down font-semibold text-gray-400 fa-solid' /> pro název rostliny
				</span>
				<div className='flex md:hidden mb-8'>
					<button onClick={(e) => changeImg({ show: false })} className='bg-gray-500 mx-1 px-2 py-1 rounded-lg font-semibold'>
						Změnit rostlinu
					</button>
					<button className='bg-gray-500 mx-1 px-2 py-1 rounded-lg font-semibold' onClick={(e) => setShow((prev) => (prev ? false : true))}>
						{show ? 'Skrýt' : 'Odhalit'} název
					</button>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
