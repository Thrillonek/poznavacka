import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';
import { isObject } from './utilities.js';

export default function Home({ poznavacka }) {
	const [mode, setMode] = useState('learning');
	const [lock, setLock] = useState(false);

	useEffect(() => {
		let startX, startY, changeX, changeY, startMS;

		if (mode == 'learning') document.querySelector(':root').style.setProperty('--settings-scale', 0);

		let handleTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startMS = Date.now();
		};
		let handleTouchMove = (e) => {
			if (!startX) return;
			let deltaX = e.touches[0].clientX;
			let deltaY = e.touches[0].clientY;
			changeX = deltaX - startX;
			changeY = deltaY - startY;
		};
		let handleTouchEnd = (e) => {
			if (Date.now() - startMS > 500 || Math.abs(changeY) >= Math.abs(changeX) || Math.abs(changeX) < 20 || lock) return;
			if (changeX > 0 && mode == 'learning') {
				setMode('quiz');
			} else if (changeX < 0 && mode == 'quiz') {
				setMode('learning');
			}
		};

		document.addEventListener('touchstart', handleTouchStart, { passive: false });
		document.addEventListener('touchmove', handleTouchMove, { passive: false });
		document.addEventListener('touchend', handleTouchEnd);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [mode, lock]);

	return (
		<div className='flex max-md:flex-col bg-neutral-800 h-full overflow-x-hidden'>
			{poznavacka && Object.values(poznavacka)[0].filter((f) => !isObject(f)).length > 0 ? (
				<div className={'relative z-10 flex-grow transition-none bg-inherit max-[400px]:transition-[left] duration-500 ' + (mode == 'quiz' ? 'left-0' : 'max-md:-left-full')}>
					<div className={'top-0 z-0 left-0 absolute w-full h-full'}>
						<Quiz poznavacka={poznavacka} />
					</div>
					<div className={'top-0 bg-inherit z-10 left-full md:left-0 absolute w-full h-full ' + (mode == 'quiz' ? 'md:hidden' : '')}>
						<List poznavacka={poznavacka} setLock={setLock} lock={lock} />
					</div>
				</div>
			) : (
				<div className='flex flex-grow justify-center items-center'>
					<h1 className='font-bold text-5xl text-center text-neutral-600'>Zvolte poznávačku...</h1>
				</div>
			)}

			{!lock && (
				<div className='z-10 flex md:flex-col max-md:justify-around items-center md:gap-2 bg-neutral-900 py-1 md:py-4 max-md:w-full text-lg'>
					<button onClick={(e) => setMode('quiz')} className={' md:text-xl py-1 md:w-full md:py-2 md:px-4 hover:bg-neutral-800 cursor-pointer '}>
						{/* <Icon icon='fa:question'></Icon> */}
						<i className={'fa-question fa-solid ' + (mode == 'quiz' ? 'text-neutral-300' : 'text-neutral-500')} />
					</button>
					<button onClick={(e) => setMode('learning')} className={' md:text-xl hover:bg-neutral-800 py-1 md:w-full md:py-2 md:px-4 cursor-pointer'}>
						<i className={'fa-list fa-solid ' + (mode == 'learning' ? 'text-neutral-300' : 'text-neutral-500')} />
					</button>
				</div>
			)}
		</div>
	);
}
