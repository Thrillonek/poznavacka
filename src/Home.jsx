import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';
import Settings from './Settings.jsx';
import { isObject } from './utilities.js';

export default function Home({ poznavacka }) {
	const [mode, setMode] = useState('learning');
	const [lock, setLock] = useState(false);
	const [options, setSettings] = useState();

	useEffect(() => {
		let startX, startY, changeX, changeY, startMS;

		// if (mode == 'learning') document.querySelector(':root').style.setProperty('--settings-scale', 0);

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

	let poznavackaWithoutDuplicates = useRef();
	useEffect(() => {
		if (poznavacka) {
			poznavackaWithoutDuplicates.current = removeDuplicates(poznavacka);
		}
	}, [poznavacka]);

	function removeDuplicates(poznavacka) {
		if (!poznavacka) return;
		let newPoznavacka = [];
		let originalItems = [];
		let arr = Object.values(poznavacka)[0];
		arr.forEach((item) => {
			if (!isObject(item)) {
				let itemWithoutNum = item.replace(/\d+/g, '');
				if (!originalItems.includes(itemWithoutNum)) {
					newPoznavacka.push(item);
					originalItems.push(itemWithoutNum);
				}
			}
		});
		return { poznavacka: newPoznavacka };
	}

	return (
		<div className='relative flex max-md:flex-col bg-neutral-800 h-full overflow-x-hidden'>
			<div className='relative flex flex-grow'>
				<div className={'flex absolute w-full h-full z-20 ' + (mode == 'settings' ? '' : 'hidden')}>
					<Settings poznavacka={options?.removeDuplicates ? poznavackaWithoutDuplicates.current : poznavacka} updateSettings={setSettings} />
				</div>
				{poznavacka && Object.values(poznavacka)[0].filter((f) => !isObject(f)).length > 0 ? (
					<div className={'relative z-10 flex-grow transition-none bg-inherit max-[400px]:transition-[left] duration-500 ' + (mode == 'quiz' ? 'left-0' : 'max-md:-left-full')}>
						<div className={'top-0 z-0 left-0 absolute w-full h-full'}>
							<Quiz poznavacka={options?.removeDuplicates ? poznavackaWithoutDuplicates.current : poznavacka} settings={options} />
						</div>
						<div className={'top-0 bg-inherit z-10 left-full md:left-0 absolute w-full h-full ' + (mode == 'learning' ? '' : 'md:hidden')}>
							<List poznavacka={options?.removeDuplicates ? poznavackaWithoutDuplicates.current : poznavacka} setLock={setLock} lock={lock} />
						</div>
					</div>
				) : (
					<div className='flex flex-grow justify-center items-center'>
						<h1 className='font-bold text-neutral-600 text-5xl text-center'>Zvolte poznávačku...</h1>
					</div>
				)}
			</div>

			<div className='z-10 flex md:flex-col max-md:justify-around items-center md:gap-2 bg-neutral-900 py-1 md:pt-8 max-md:w-full text-lg'>
				<button onClick={(e) => setMode('quiz')} className={'menu-btn'}>
					<Icon icon='mdi:question-mark' className={' ' + (mode == 'quiz' ? 'active' : '')} />
				</button>
				<button onClick={(e) => setMode('learning')} className={'menu-btn '}>
					<Icon icon='mdi:format-list-bulleted-square' className={' ' + (mode == 'learning' ? 'active' : '')} />
				</button>
				<button onClick={(e) => setMode('settings')} className={'menu-btn'}>
					<Icon icon='mdi:gear' className={' ' + (mode == 'settings' ? 'active' : '')}></Icon>
				</button>
			</div>
		</div>
	);
}
