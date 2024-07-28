import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [show, setShow] = useState();
	const [text, setText] = useState();
	const [min, setMin] = useState('1');
	const [max, setMax] = useState('150');
	const [index, setIndex] = useState({ number: null, imgLoaded: false });
	const [error, setError] = useState();

	let check = [];
	let files = __FILES__;

	useEffect(() => change(), []);

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

		document.querySelector('.change-btn').onclick = (e) => {
			change();
			setShow(false);
		};

		document.body.onkeydown = (e) => {
			if (e.key == 'ArrowUp') {
				change();
				setShow(false);
			}
			if (e.key == 'ArrowDown') {
				setShow((prev) => (prev ? false : true));
			}
		};
	}, [min, max]);

	function change() {
		setError(null);
		if (max <= min) return setError('Dolní hranice musí být nižší než ta horní');
		if (!min || !max) return setError('Prosím vyplň obě hranice');
		if (min < 1) return setError('Dolní hranice nemůže být nižší než 1');
		if (max > files.length) return setError('Horní hranice nemůže být vyšší než ' + files.length);

		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		let idx = rng(parseInt(min) - 1 || 0, parseInt(max) - 1 || files.length);
		let range = max - min;
		let mid = Math.round(range / 2);
		while (check.includes(idx)) {
			if (range < 8) break;
			let adjustment = Math.round(range / 10);
			if (mid > idx) idx += adjustment;
			else idx -= adjustment;
		}

		setIndex({ number: idx + 1, imgLoaded: false });
		if (check.length == 3) check.shift();
		check.push(idx);

		let name = files[idx];
		setText(name);
	}

	return (
		<div className='flex flex-col justify-between items-center bg-gray-700 w-full h-svh'>
			<div className='p-2 h-1/2'>
				<img onLoad={() => setIndex({ number: index.number, imgLoaded: true })} className='rounded h-full max-h-full' src={encodeURI('./assets/' + text).replaceAll('+', '%2b')} />
				<p className={'text-center mt-2 ' + (error ? 'text-red-400 text-lg' : 'text-white font-semibold text-2xl')}>{error ? error : !index.imgLoaded ? 'Načítání...' : show ? text.slice(0, -4).replace(/\d+/g, '') : index.number}</p>
			</div>
			<div className='flex flex-col justify-around items-center h-1/2'>
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
				<div className='flex flex-col md:hidden'>
					<button className='bg-gray-500 my-1 px-2 py-1 rounded-lg change-btn'>Změnit rostlinu</button>
					<button className='bg-gray-500 my-1 px-2 py-1 rounded-lg' onClick={(e) => setShow((prev) => (prev ? false : true))}>
						{show ? 'Skrýt' : 'Odhalit'} název
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
