import { useMemo, useRef } from 'react';
import { useModeStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { addFileToCompleted, changeImage } from '../utils';

export function useHandleSwiping() {
	const mode = useModeStore((store) => store.mode);

	const offsetRef = useRef(0);

	const isModeQuiz = useMemo(() => mode == 'quiz', [mode]);

	if (!isModeQuiz) return;

	const mainContentWidth = document.querySelector('.main-content')?.clientWidth || window.innerWidth;
	const offsetLimit = mainContentWidth / 5;

	useAddEventListener('custom:swipe', (e: CustomEvent) => {
		if (e.detail.direction == 'left') changeImage();
		if (e.detail.direction == 'right') addFileToCompleted();
	});

	useAddEventListener('custom:drag', (e: CustomEvent) => {
		if (e.detail.isTouch) offsetRef.current = e.detail.deltaX;
	});

	useAddEventListener('touchend', () => {
		try {
			if (offsetRef.current > offsetLimit) changeImage();
			if (offsetRef.current < -offsetLimit) addFileToCompleted();
		} finally {
			offsetRef.current = 0;
		}
	});
}
