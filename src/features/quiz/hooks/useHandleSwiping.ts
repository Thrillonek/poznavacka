import { useSearchParams } from 'next/navigation';
import { useMemo, useRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import { quizDragOffsetLimit as offsetLimit } from '../data/constants';
import { addFileToCompleted, changeImage } from '../utils';

export function useHandleSwiping() {
	const searchParams = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	const offsetRef = useRef(0);

	const isModeQuiz = mode == 'quiz';

	useAddEventListener(
		'custom:drag',
		(e: CustomEvent) => {
			if (!isModeQuiz) return;

			if (e.detail.isTouch) offsetRef.current = e.detail.deltaX;
		},
		[mode],
	);

	useAddEventListener(
		'touchend',
		() => {
			if (!isModeQuiz) return;

			if (offsetRef.current > offsetLimit) addFileToCompleted(); // right
			if (offsetRef.current < -offsetLimit) changeImage(); // left

			offsetRef.current = 0;
		},
		[mode],
	);
}
