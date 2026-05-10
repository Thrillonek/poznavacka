import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useSearchParams } from 'react-router';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils';
import { isFileInCurrentFolder } from 'src/utils/isFileInCurrentFolder';
import '../assets/_Quiz.scss';
import { quizDragOffsetLimit } from '../data/constants';
import { useQuizFileStore } from '../data/stores';
import { fileIndexList } from '../data/variables';
import { useUpdateOnCompletedFiles } from '../hooks/useUpdateOnCompletedFiles';
import { addFileToCompleted, changeImage, initiateQuiz } from '../utils';
import QuizControlPanel from './QuizControlPanel';
import { ImageViewer, NameViewer } from './QuizImageViewer';

function Quiz(props: any) {
	const toggleFileNameRevealed = useQuizFileStore((store) => store.toggleFileNameRevealed);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	const [searchParams, _] = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	const updateSettings = useSettingsStore((store) => store.updateSettings);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const [visibleSide, setVisibleSide] = useState<'complete' | 'change' | undefined>();

	useEffect(() => {
		updateSettings('quiz', 'max', getFiles().length);
	}, [poznavacka]);

	useEffect(() => {
		initiateQuiz();
		changeImage();
	}, [poznavacka, settings.quiz.min, settings.quiz.max, settings.quiz.random]);

	useEffect(() => {
		if (completedFiles.filter((f) => isFileInCurrentFolder(f)).length == 0) {
			initiateQuiz();
		}
	}, [completedFiles]);

	function handleKeyDown(e: KeyboardEvent) {
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

	useAddEventListener('keydown', handleKeyDown, [settings.keybinds, mode]);
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
		<div tabIndex={0} style={props.style} className='quiz-container'>
			<ImageViewer />
			<NameViewer />
			<QuizControlPanel />
			<div style={{ opacity: visibleSide == 'complete' ? 1 : 0 } as CSSProperties} data-right className='quiz-indicator'></div>
			<div style={{ opacity: visibleSide == 'change' ? 1 : 0, '--color': 'var(--danger)' } as CSSProperties} data-left className='quiz-indicator'></div>
		</div>
	);
}

export default Quiz;
