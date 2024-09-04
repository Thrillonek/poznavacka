import { useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';

export default function App() {
	const [mode, setMode] = useState('quiz');

	return (
		<div className='w-screen h-screen overflow-hidden'>
			<div className={'relative w-[200vw] h-full transition-transform duration-[650ms] ' + (mode == 'learning' && '-translate-x-1/2')}>
				<div className='top-0 left-0 absolute w-screen h-full'>
					<div className='relative'>
						<Quiz />
						<div className='right-0 bottom-0 absolute'>
							<button onClick={(e) => setMode('learning')} className={'relative top-10 border-gray-600 bg-gray-700 shadow-[0_0_30px_0_rgb(0,0,0,0.3)] py-1 pr-2 pl-4 border-t border-l rounded-tl-xl font-semibold text-gray-300 transition-all delay-[650ms] ' + (mode == 'quiz' && '!top-0')}>
								List rostlin
								<i className='fa-arrow-right ml-2 fa-solid' />
							</button>
						</div>
					</div>
				</div>
				<div className='top-0 left-[100vw] absolute w-screen h-full'>
					<div className='relative'>
						<List />
						<div className='bottom-0 left-0 absolute'>
							<button onClick={(e) => setMode('quiz')} className={'relative top-10 border-gray-600 bg-gray-700 shadow-[0_0_30px_0_rgb(0,0,0,0.3)] py-1 pr-4 pl-2 border-t border-r rounded-tr-xl font-semibold text-gray-300 transition-all delay-[650ms] ' + (mode == 'learning' && '!top-0')}>
								<i className='fa-arrow-left mr-2 fa-solid' />
								Kvíz
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
