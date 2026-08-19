import { Icon } from '@iconify/react/dist/iconify.js';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useSettingsStore } from 'src/data';
import QuizSettings from 'src/features/settings/components/pages/QuizSettings';
import { useAddEventListener } from 'src/hooks';
import '../assets/_Quiz.scss';
import { quizDragOffsetLimit } from '../data/constants';
import { useQuizFileStore, useQuizSettingsStore } from '../data/stores';
import { useHandleQuizUpdates } from '../hooks/useHandleQuizUpdates';
import { addFileToCompleted, changeImage } from '../utils';
import PreloadQuiz from './PreloadQuiz';
import QuizControlPanel from './QuizControlPanel';
import { ImageViewer, NameViewer } from './QuizImageViewer';

function Quiz(props: any) {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	const settings = useSettingsStore((store) => store.settings);

	const isSettingsVisible = useQuizSettingsStore((store) => store.isVisible);
	const toggleSettingsVisible = useQuizSettingsStore((store) => store.toggleVisibility);

	const searchParams = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	const [visibleSide, setVisibleSide] = useState<'complete' | 'change' | undefined>();

	useHandleQuizUpdates();

	function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
		if (mode !== 'quiz') return;
		if (e.key == settings.keybinds.change) {
			changeImage();
		}
		if (e.key == settings.keybinds.reveal) {
			toggleFileNameRevealed();
		}
		if (e.key == settings.keybinds.complete) {
			addFileToCompleted();
		}
	}

	useAddEventListener('custom:drag', (e: CustomEvent) => {
		if (!e.detail.isTouch) return;

		if (e.detail.deltaX < -quizDragOffsetLimit) {
			//LEFT SIDE
			setVisibleSide('change');
		} else if (e.detail.deltaX > quizDragOffsetLimit) {
			//RIGHT SIDE
			setVisibleSide('complete');
		} else {
			setVisibleSide(undefined);
		}
	});

	useAddEventListener('touchend', () => {
		setVisibleSide(undefined);
	});

	return (
		<div tabIndex={0} onKeyDown={handleKeyDown} style={props.style} className='quiz-container'>
			<ImageViewer />
			<NameViewer />
			<QuizControlPanel />
			<PreloadQuiz />
			<div style={{ opacity: visibleSide == 'complete' ? 1 : 0 } as CSSProperties} data-right className='quiz-indicator'></div>
			<div style={{ opacity: visibleSide == 'change' ? 1 : 0, '--color': 'var(--danger)' } as CSSProperties} data-left className='quiz-indicator'></div>

			<div className='z-20 absolute inset-0 flex items-end bg-black/50 p-4! transition-opacity' style={{ opacity: isSettingsVisible ? 1 : 0, pointerEvents: isSettingsVisible ? 'auto' : 'none' }} onClick={() => toggleSettingsVisible(false)}>
				<div style={{ transform: !isSettingsVisible ? 'translateY(1rem)' : '' }} onClick={(e) => e.stopPropagation()} className='flex flex-col bg-dark rounded-xl w-full max-h-full overflow-hidden transition-transform'>
					<div className='flex justify-between items-center border-b border-(--border) bg-base px-4 p-2'>
						<h2 className='text-main'>Nastavení kvízu</h2>
						<button onClick={() => toggleSettingsVisible(false)}>
							<Icon icon='mdi:close' className='text-muted text-lg' />
						</button>
					</div>
					<div className='flex flex-col gap-4 p-4 overflow-auto'>
						<QuizSettings />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
