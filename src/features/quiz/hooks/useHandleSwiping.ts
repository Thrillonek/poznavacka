import { useMemo, useRef } from 'react';
import { useModeStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { addFileToCompleted, changeImage } from '../utils';

export function useHandleSwiping() {
	const mode = useModeStore((store) => store.mode);

	const offsetRef = useRef(0);

	const isModeQuiz = useMemo(() => mode == 'quiz', [mode]);

	const mainContentWidth = document.querySelector('.main-content')?.clientWidth || window.innerWidth;
	const offsetLimit = mainContentWidth / 5;

	useAddEventListener('custom:swipe', (e: CustomEvent) => {
		if (!isModeQuiz) return;
		if (e.detail.direction == 'left') changeImage();
		if (e.detail.direction == 'right') addFileToCompleted();
	});

	useAddEventListener('custom:drag', (e: CustomEvent) => {
		if (!isModeQuiz) return;
		offsetRef.current = e.detail.deltaX;
	});

	useAddEventListener('pointerup', () => {
		if (!isModeQuiz) return;
		try {
			console.log(offsetLimit, offsetRef.current);
			if (offsetRef.current > offsetLimit) changeImage();
			if (offsetRef.current < -offsetLimit) addFileToCompleted();
		} finally {
			offsetRef.current = 0;
		}
	});
}
