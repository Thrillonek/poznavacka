import { useEffect, useRef, useState } from 'react';
import { plants } from './utilities.js';

function Test() {
	const [plant, setPlant] = useState();
	const [count, setCount] = useState(0);

	const arr = useRef([]);

	useEffect(() => {
		if (arr.current.length > 0) return;
		for (let i = 1; i <= 20; i++) {
			arr.current.push(i * 7 - 1);
		}
	}, [arr.current]);

	function reset() {
		arr.current = [];
		setCount(0);
		setPlant();
	}

	function changePlant() {
		const chosen = arr.current[Math.floor(Math.random() * arr.current.length)];
		setPlant(plants[chosen]);
		arr.current.splice(arr.current.indexOf(chosen), 1);
		setCount((prevCount) => prevCount + 1);
	}

	return (
		<div className='flex flex-col justify-between items-center bg-gray-700 p-5 w-full h-full'>
			<h1 className='font-bold text-3xl text-center text-white'>Krytosemenné rostliny poznávačka</h1>
			{plant ? (
				<div className='flex flex-col items-center h-1/2'>
					<h2 className='mb-4 py-2 font-bold text-2xl text-white'>{count}</h2>
					<img src={('./assets/rostliny/' + plant).replace(' ', '%20').replace('+', '%2b')} className='h-[90%]' alt='obrázek rostliny' />
				</div>
			) : (
				<h1 onClick={changePlant} className='top-1/2 absolute p-8 font-bold text-5xl text-white tracking-widest cursor-pointer'>
					ZAČÍT
				</h1>
			)}
			{plant && (
				<div className='flex flex-col items-center w-full'>
					<button onClick={changePlant} className='flex justify-center items-center bg-blue-500 p-3 rounded-xl w-1/2 font-bold text-lg text-white'>
						Další
					</button>
					<p onClick={reset} className='mt-4 text-white hover:text-red-400 cursor-pointer'>
						Resetovat
					</p>
				</div>
			)}
		</div>
	);
}

export default Test;
