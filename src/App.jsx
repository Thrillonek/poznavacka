import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [show, setShow] = useState();
	const [text, setText] = useState();
	const [min, setMin] = useState('1');
	const [max, setMax] = useState('150');
 const [index, setIndex] = useState({ number: null, imgLoaded: false })

	let check = [];
	let files = __FILES__;

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
		change();

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
		const rng = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

		let idx = rng(parseInt(min) - 1 || 0, parseInt(max) - 1 || files.length);
  let range = (max - min)
  let mid = Math.round(range / 2)
		while (check.includes(idx)) {
   if(range < 8) break
   let adjustment = Math.round((max - min) /10)
   if(mid >= idx)	 idx += adjustment
   else idx -= adjustment
		}
 
  setIndex({number:idx+1, imgLoaded: false})
		if (check.length == 3) check.shift();
		check.push(idx);

		let name = files[idx];
		setText(name);
	}

	return (
		<div className='w-full h-svh flex flex-col justify-between items-center bg-gray-700'>
			<div className='h-1/2 p-2'>
				<img onLoad={() => setIndex(prev => {...prev, imgLoaded: true})} className='h-full max-h-full rounded' src={encodeURI('./assets/' + text).replaceAll("+","%2b")} />
				<p className='text-2xl text-white text-center mt-2 font-semibold'>{show ? text.slice(0, -4).replace(/\d+/g, '') : index.imgLoaded ? index.number : "Loading..."}</p>
			</div>
			<div className='h-1/2 flex flex-col justify-around items-center'>
				<p className='font-bold text-gray-300 text-xl'>
					Rostliny od
					<input className='rounded p-1 bg-gray-600 outline-none caret-gray-500 text-gray-400 w-12 mx-1' type='text' onChange={(e) => !isNaN(e.target.value) && setMin(e.target.value)} value={min} />
					do
					<input className='rounded p-1 bg-gray-600 outline-none caret-gray-500 text-gray-400 w-12 ml-1' type='text' onChange={(e) => !isNaN(e.target.value) && setMax(e.target.value)} value={max} />
				</p>
				<span className='text-lg text-gray-500 hidden md:block'>
					<i className='fa-solid fa-arrow-up font-semibold text-gray-400' /> pro změnu rostliny
					<br />
					<i className='fa-solid fa-arrow-down font-semibold text-gray-400' /> pro název rostliny
				</span>
				<div className='md:hidden flex flex-col'>
					<button className='my-1 py-1 px-2 bg-gray-500 rounded-lg change-btn'>Změnit rostlinu</button>
					<button className='my-1 py-1 px-2 bg-gray-500 rounded-lg' onClick={(e) => setShow((prev) => (prev ? false : true))}>
						{show ? "Skrýt" : "Odhalit"} název
					</button>
				</div>
			</div>
		</div>
	);
}

export default App;
