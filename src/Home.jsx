import { useEffect, useRef, useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';

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
		<div className='flex flex-col w-screen h-full overflow-x-hidden'>
			<div className={'relative w-[200vw] z-10 h-full transition-transform duration-500 ' + (mode == 'learning' && '-translate-x-1/2')}>
				<div className='top-0 left-0 absolute w-screen h-full'>
					<Quiz poznavacka={poznavacka} />
				</div>
				<div className='top-0 left-[100vw] absolute w-screen h-full'>
					<List poznavacka={poznavacka} setLock={setLock} lock={lock} />
				</div>
			</div>
			{!lock && (
				<div className='z-20 flex justify-around items-center shadow-[0_0_20px_0_rgb(0,0,0,0.3)] md:py-2 w-full'>
					<p onClick={(e) => setMode('quiz')} className={'text-[--bg-secondary] text-lg md:text-xl py-1 font-semibold cursor-pointer ' + (mode == 'quiz' && 'text-[--text-main]')}>
						<i className='mr-3 fa-seedling fa-solid' />
						<span className='max-md:hidden'>Kvíz</span>
					</p>
					<p onClick={(e) => setMode('learning')} className={'text-[--bg-secondary] text-lg md:text-xl py-1 font-semibold cursor-pointer ' + (mode == 'learning' && 'text-[--text-main]')}>
						<i className='mr-3 fa-list fa-solid' />
						<span className='max-md:hidden'>Seznam</span>
					</p>
				</div>
			)}
		</div>
	);
}
