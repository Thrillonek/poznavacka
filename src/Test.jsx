import { useEffect, useRef, useState } from 'react';
import { plants } from './utilities.js';

function Test() {
	const [plant, setPlant] = useState();
	const [count, setCount] = useState(0);

	const arr = useRef([]);

	useEffect(() => {
		for (let i = 1; i <= 20; i++) {
			arr.current.push(i * 7 - 1);
		}
	}, []);

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
					<h2 className='py-2 font-bold text-white text-xl'>{count}</h2>
					<img src={('./assets/rostliny/' + plant).replace(' ', '%20').replace('+', '%2b')} className='h-[90%]' alt='obrázek rostliny' />
				</div>
			) : (
				<h1 onClick={changePlant} className='top-1/2 absolute p-8 font-bold text-5xl text-white tracking-widest cursor-pointer'>
					ZAČÍT
				</h1>
			)}
			{plant && (
				<button onClick={changePlant} className='flex justify-center items-center bg-blue-500 p-3 rounded-xl w-1/2 font-bold text-lg text-white'>
					Další
				</button>
			)}
		</div>
	);
}

export default Test;
