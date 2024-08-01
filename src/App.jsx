import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
	const [show, setShow] = useState();
	const [text, setText] = useState();
	const [min, setMin] = useState('1');
	const [max, setMax] = useState('150');
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();
	const [mode, setMode] = useState('custom');

	let forbiddenIdx = useRef([]);
	let prevIdx;
	let files = __FILES__;

	useEffect(() => changeImg(), []);

	useEffect(() => {
		files.sort((a, b) => {
			let ai = a.split('');
			ai = ai.filter((n) => !isNaN(n));
			ai = ai.join('');
			let bi = b.split('');
			bi = bi.filter((n) => !isNaN(n));
			bi = bi.join('');
			return parseInt(ai) - parseInt(bi);
		});

		document.body.onkeydown = (e) => {
			if (e.key == 'ArrowUp') {
				changeImg();
				setShow(false);
			}
			if (e.key == 'ArrowDown') {
				setShow((prev) => (prev ? false : true));
			}
		};
	}, [min, max]);

	function changeImg(options) {
		options?.show != undefined && setShow(options.show);

		let minInt = parseInt(min);
		let maxInt = parseInt(max);

		setError(null);
		if (maxInt <= minInt || (!max && minInt >= files?.length) || (!min && maxInt < 1)) return setError('Dolní hranice musí být nižší než ta horní');
		if (!min || !max) return setError('Prosím vyplň obě hranice');
		if (minInt < 1) return setError('Dolní hranice nemůže být nižší než 1');
		if (maxInt > files.length) return setError('Horní hranice nemůže být vyšší než ' + files.length);

		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		let idx = rng(minInt - 1 || 0, maxInt - 1 || files.length);
		let range = maxInt - minInt + 1;
		let mid = Math.ceil(range / 2 + minInt - 1);
		let adjustment = mid > idx ? 1 : -1;

		if (Math.floor(range / 3) < forbiddenIdx.current.length) forbiddenIdx.current = [];

		while (forbiddenIdx.current.includes(idx)) {
			if (range < 3) break;
			idx += adjustment;
		}

		if (range == 2 && idx == prevIdx) idx == minInt - 1 ? idx++ : idx--;

		setIndex({ number: idx + 1, imgLoaded: idx == prevIdx });
		if (range >= 3 && forbiddenIdx.current.length >= Math.floor(range / 3)) forbiddenIdx.current.shift();
		forbiddenIdx.current.push(idx);

		let name = files[idx];
		setText(name);

		prevIdx = idx;
	}

	return (
		<div className='flex flex-col justify-between items-center bg-gray-700 w-full h-svh'>
			<div className='flex flex-col justify-between items-center p-2 h-1/2'>
				<img onLoad={() => setIndex({ number: index.number, imgLoaded: true })} className='rounded h-full max-h-[90%]' src={'./assets/' + text} />
				<div className={error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl'}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? text.slice(0, -4).replaceAll(/\d+/g, '') : index.number}</div>
			</div>
			<div className='flex flex-col justify-between items-center w-full h-1/2'>
				<div className='flex justify-between bg-gray-600 mt-3 px-1 py-1 rounded-full w-2/3'>
					<button onClick={(e) => setMode('custom')} className={'border-r border-[rgb(95,105,115)] w-1/2 ' + (mode == 'custom' ? 'text-white' : 'text-gray-400')}>
						Vlastní nastavení
					</button>
					<button onClick={(e) => setMode('preset')} className={'border-l border-[rgb(95,105,115)] w-1/2 ' + (mode == 'preset' ? 'text-white' : 'text-gray-400')}>
						Předvolby
					</button>
				</div>
				<p className='font-bold text-gray-300 text-xl'>
					Rostliny od
					<input className='bg-gray-600 mx-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => !isNaN(e.target.value) && setMin(e.target.value)} value={min} />
					do
					<input className='bg-gray-600 ml-1 p-1 rounded w-12 text-gray-400 caret-gray-500 outline-none' type='text' onChange={(e) => !isNaN(e.target.value) && setMax(e.target.value)} value={max} />
				</p>
				<span className='md:block hidden text-gray-500 text-lg'>
					<i className='fa-arrow-up font-semibold text-gray-400 fa-solid' /> pro změnu rostliny
					<br />
					<i className='fa-arrow-down font-semibold text-gray-400 fa-solid' /> pro název rostliny
				</span>
				<div className='flex md:hidden mb-8'>
					<button onClick={(e) => changeImg({ show: false })} className='bg-gray-500 mx-1 px-2 py-1 rounded-lg'>
						Změnit rostlinu
					</button>
					<button className='bg-gray-500 mx-1 px-2 py-1 rounded-lg' onClick={(e) => setShow((prev) => (prev ? false : true))}>
						{show ? 'Skrýt' : 'Odhalit'} název
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
