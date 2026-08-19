import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useSettingsStore } from 'src/data';
import { useQuizSettingsStore } from '../data/stores';

export default function QuizIndicators() {
	const settings = useSettingsStore((state) => state.settings);
	const updateSettings = useSettingsStore((state) => state.updateSettings);
	const toggleSettingsVisible = useQuizSettingsStore((state) => state.toggleVisibility);

	return (
		<div style={{ width: 'min(100%, 600px)' }} className='relative flex justify-between items-center text-muted'>
			<button onClick={() => updateSettings('quiz', 'random', !settings.quiz.random)} className={clsx('z-10 place-items-center grid bg-light rounded-full h-10 aspect-square', settings.quiz.random && 'bg-accent-muted text-accent')}>
				<Icon icon='fa7-solid:random' className='text-xl' />
			</button>
			<div className={clsx('z-10 place-items-center grid bg-light px-4 rounded-full h-10')}>
				{settings.quiz.min} - {settings.quiz.max}
			</div>
			<button onClick={() => updateSettings('quiz', 'devMode', !settings.quiz.devMode)} className={clsx('z-10 place-items-center grid bg-light rounded-full h-10 aspect-square', settings.quiz.devMode && 'bg-accent-muted text-accent')}>
				<Icon icon='mdi:code-braces' className='text-xl' />
			</button>
			<button className='rounded-full z-10 bg-light border w-10 aspect-square grid place-items-center border-(--border)' onClick={() => toggleSettingsVisible(true)}>
				<Icon icon='mdi:gear' className='text-muted text-xl' />
			</button>
			<div className='z-0 absolute inset-2 bg-base rounded-full'></div>
		</div>
	);
}
