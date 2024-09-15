import { useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';

export default function App() {
	const [mode, setMode] = useState('learning');

	return (
		<div className='flex flex-col w-screen h-dvh overflow-x-hidden'>
			<div className={'relative w-[200vw] h-full transition-transform duration-[650ms] ' + (mode == 'learning' && '-translate-x-1/2')}>
				<div className='top-0 left-0 absolute w-screen h-full'>
					<Quiz />
				</div>
				<div className='top-0 left-[100vw] absolute w-screen h-full'>
					<List />
				</div>
			</div>
			<div className='flex justify-around items-center border-gray-500 bg-[rgb(65,75,90)] shadow-[0_-5px_10px_-1px_rgb(0,0,0,0.3)] py-1 md:py-2 border-t w-full'>
				<p className={'text-gray-500 text-lg md:text-xl font-semibold ' + (mode == 'quiz' && '!text-gray-400')}>
					<i onClick={(e) => setMode('quiz')} className='mr-3 fa-seedling fa-solid' />
					<span className='max-md:hidden'>Kvíz</span>
				</p>
				<p className={'text-gray-500 text-lg md:text-xl font-semibold ' + (mode == 'learning' && '!text-gray-400')}>
					<i onClick={(e) => setMode('learning')} className='mr-3 fa-list fa-solid' />
					<span className='max-md:hidden'>Seznam rostlin</span>
				</p>
			</div>
		</div>
	);
}
