import { useMemo, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router';
import { useSettingsStore } from 'src/data';
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
		</div>
	);
}

export default Quiz;
