import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import { quizDragOffsetLimit as offsetLimit } from '../data/constants';
import { useQuizSettingsStore } from '../data/stores';
import { addFileToCompleted, changeImage } from '../utils';

export function useHandleSwiping() {
	const searchParams = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);
	const isQuizSettingsVisible = useQuizSettingsStore((store) => store.isVisible);

	const offsetRef = useRef(0);

	const isModeQuiz = mode == 'quiz';

	useAddEventListener(
		'custom:drag',
		(e: CustomEvent) => {
			if (!isModeQuiz || isQuizSettingsVisible) return;

			if (e.detail.isTouch) offsetRef.current = e.detail.deltaX;
		},
		[mode],
	);

	useAddEventListener(
		'touchend',
		() => {
			if (!isModeQuiz || isQuizSettingsVisible) return;

			if (offsetRef.current > offsetLimit) addFileToCompleted(); // right
			if (offsetRef.current < -offsetLimit) changeImage(); // left

			offsetRef.current = 0;
		},
		[mode],
	);
}
