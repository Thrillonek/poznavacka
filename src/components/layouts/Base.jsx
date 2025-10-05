import { useModeStore, usePoznavackaStore } from '@/data';
import { useDetectSwipe } from '@/hooks/useDetectSwipe.js';
import { isObject } from '@/utils';
import { Icon } from '@iconify/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import List from '../../features/list/components/List.jsx';
import Quiz from '../../features/quiz/components/Quiz.jsx';
import Settings from '../../features/settings/components/Settings.jsx';
import ModeMenu from '../ui/ModeMenu.jsx';

export default function Base() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { mode, setMode } = useModeStore((store) => store);

	const swipeDirection = useDetectSwipe();

	useEffect(() => {
		if (swipeDirection == 'right' && mode == 'list') setMode('quiz');
		if (swipeDirection == 'left' && mode == 'quiz') setMode('list');
	}, [swipeDirection]);

	return (
		<div className='relative flex max-md:flex-col bg-neutral-800 h-full overflow-x-hidden'>
			<div className='relative flex flex-grow'>
				<div className={'flex absolute w-full h-full z-20 ' + (mode == 'settings' ? '' : 'hidden')}>
					<Settings />
				</div>
				{poznavacka && Object.values(poznavacka)[0].filter((f) => !isObject(f)).length > 0 ? (
					<div className={'relative z-10 flex-grow transition-none bg-inherit max-[400px]:transition-[left] duration-500 ' + (mode == 'quiz' ? 'left-0' : 'max-md:-left-full')}>
						<div className={'top-0 z-0 left-0 absolute w-full h-full'}>
							<Quiz />
						</div>
						<div className={'top-0 bg-inherit z-10 left-full md:left-0 absolute w-full h-full ' + (mode == 'list' ? '' : 'md:hidden')}>
							<List />
						</div>
					</div>
				) : (
					<div className='flex flex-grow justify-center items-center'>
						<h1 className='font-bold text-neutral-600 text-5xl text-center'>Zvolte poznávačku...</h1>
					</div>
				)}
			</div>

			{/* MODE MENU  */}
			<div className='md:hidden'>
				<ModeMenu />
			</div>
		</div>
	);
}
