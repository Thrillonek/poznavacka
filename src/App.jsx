import { useState } from 'react';
import List from './List.jsx';
import Quiz from './Quiz.jsx';

export default function App() {
	const [mode, setMode] = useState('quiz');

	if (mode == 'quiz') {
		return (
			<div className='relative'>
				<Quiz />
				<button onClick={(e) => setMode('learning')} className='right-5 bottom-1 absolute font-semibold text-gray-300'>
					List rostlin
					<i className='fa-arrow-right ml-1 fa-solid' />
				</button>
			</div>
		);
	} else if (mode == 'learning') {
		return (
			<div>
				<List />
				<button onClick={(e) => setMode('quiz')} className='bottom-1 left-5 absolute font-semibold text-gray-300'>
					<i className='fa-arrow-left mr-1 fa-solid' />
					Kvíz
				</button>
			</div>
		);
	}
}
