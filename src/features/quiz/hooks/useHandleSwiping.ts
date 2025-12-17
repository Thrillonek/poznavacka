import { useRef } from 'react';
import { useModeStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { addFileToCompleted, changeImage } from '../utils';

export function useHandleSwiping() {
	const mode = useModeStore((store) => store.mode);

	const offsetRef = useRef(0);

	const isModeQuiz = mode == 'quiz';

	const mainContentWidth = document.querySelector('.main-content')?.getBoundingClientRect().width || window.innerWidth;
	const offsetLimit = mainContentWidth / 5;

	useAddEventListener(
		'custom:swipe',
		(e: CustomEvent) => {
			if (!isModeQuiz) return;
			if (e.detail.direction == 'left') changeImage();
			if (e.detail.direction == 'right') addFileToCompleted();
		},
		[mode]
	);

	useAddEventListener(
		'custom:drag',
		(e: CustomEvent) => {
			if (!isModeQuiz) return;
			offsetRef.current = e.detail.deltaX;
		},
		[mode]
	);

	useAddEventListener(
		'pointerup',
		() => {
			if (!isModeQuiz) return;

			if (offsetRef.current > offsetLimit) changeImage();
			if (offsetRef.current < -offsetLimit) addFileToCompleted();

			offsetRef.current = 0;
		},
		[mode]
	);
}
