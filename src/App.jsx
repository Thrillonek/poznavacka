import { useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';

export default function App() {
	const [mode, setMode] = useState('quiz');

	if (mode == 'quiz') {
		return (
			<div>
				<Quiz />
				<button onClick={(e) => setMode('learning')} className='right-0 bottom-0 fixed border-gray-600 bg-gray-700 shadow-[0_0_30px_0_rgb(0,0,0,0.3)] py-1 pr-2 pl-4 border-t border-l rounded-tl-xl font-semibold text-gray-300'>
					List rostlin
					<i className='fa-arrow-right ml-2 fa-solid' />
				</button>
			</div>
		);
	} else if (mode == 'learning') {
		return (
			<div>
				<List />
				<button onClick={(e) => setMode('quiz')} className='bottom-0 left-0 fixed border-gray-600 bg-gray-700 shadow-[0_0_30px_0_rgb(0,0,0,0.3)] py-1 pr-4 pl-2 border-t border-r rounded-tr-xl font-semibold text-gray-300'>
					<i className='fa-arrow-left mr-2 fa-solid' />
					Kvíz
				</button>
			</div>
		);
	}
}
