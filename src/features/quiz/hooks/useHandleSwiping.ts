import { useRef } from 'react';
import { useModeStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { quizDragOffsetLimit as offsetLimit } from '../data/constants';
import { addFileToCompleted, changeImage } from '../utils';

export function useHandleSwiping() {
	const mode = useModeStore((store) => store.mode);

	const offsetRef = useRef(0);

	const isModeQuiz = mode == 'quiz';

	useAddEventListener(
		'custom:drag',
		(e: CustomEvent) => {
			if (!isModeQuiz) return;

			if (e.detail.isTouch) offsetRef.current = e.detail.deltaX;
		},
		[mode]
	);

	useAddEventListener(
		'touchend',
		() => {
			if (!isModeQuiz) return;

			if (offsetRef.current > offsetLimit) changeImage();
			if (offsetRef.current < -offsetLimit) addFileToCompleted();

			offsetRef.current = 0;
		},
		[mode]
	);
}
