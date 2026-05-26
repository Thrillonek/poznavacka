import { Icon } from '@iconify/react/dist/iconify.js';
import { useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useSettingsStore } from 'src/data';
import QuizSettings from 'src/features/settings/components/pages/QuizSettings';
import { useAddEventListener } from 'src/hooks';
import '../assets/_Quiz.scss';
import { quizDragOffsetLimit } from '../data/constants';
import { useQuizFileStore } from '../data/stores';
import { useHandleQuizUpdates } from '../hooks/useHandleQuizUpdates';
import { useUpdateOnCompletedFiles } from '../hooks/useUpdateOnCompletedFiles';
import { addFileToCompleted, changeImage } from '../utils';
import QuizControlPanel from './QuizControlPanel';
import { ImageViewer, NameViewer } from './QuizImageViewer';

function Quiz(props: any) {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	const settings = useSettingsStore((store) => store.settings);

	const [searchParams, _] = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	const [visibleSide, setVisibleSide] = useState<'complete' | 'change' | undefined>();
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

	useUpdateOnCompletedFiles();

	return (
		<div tabIndex={0} onKeyDown={handleKeyDown} style={props.style} className='quiz-container'>
			<ImageViewer />
			<NameViewer />
			<QuizControlPanel />
			<div style={{ opacity: visibleSide == 'complete' ? 1 : 0 } as CSSProperties} data-right className='quiz-indicator'></div>
			<div style={{ opacity: visibleSide == 'change' ? 1 : 0, '--color': 'var(--danger)' } as CSSProperties} data-left className='quiz-indicator'></div>
			<button className='absolute md:hidden rounded-full bg-light border w-8 aspect-square grid place-items-center border-(--border) right-2 bottom-2' onClick={() => setIsSettingsOpen(true)}>
				<Icon icon='mdi:gear' className='text-muted text-lg' />
			</button>

			<div className='md:hidden absolute inset-0 flex items-end bg-black/50 p-4! transition-opacity' style={{ opacity: isSettingsOpen ? 1 : 0, pointerEvents: isSettingsOpen ? 'auto' : 'none' }} onClick={() => setIsSettingsOpen(false)}>
				<div style={{ transform: !isSettingsOpen ? 'translateY(1rem)' : '' }} onClick={(e) => e.stopPropagation()} className='bg-dark rounded-xl w-full max-h-full overflow-hidden transition-transform'>
					<div className='flex justify-between items-center border-b border-(--border) bg-base px-4 p-2'>
						<h2 className='text-main'>Nastavení kvízu</h2>
						<button onClick={() => setIsSettingsOpen(false)}>
							<Icon icon='mdi:close' className='text-muted text-lg' />
						</button>
					</div>
					<div className='flex flex-col overflow-auto gap-4 p-4'>
						<QuizSettings />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Quiz;
