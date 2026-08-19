import { useEffect } from 'react';
import { useSelectedFileStore } from '../data/stores';

//NOT FINISHED - THE BASE OF A POTENTIAL SMOOTH SWIPE DOWN HOOK - SHOULD VISIBLY REACT TO EVERY TOUCH MOVE ON Y AXIS
export function useSmoothSwipeDown() {
	const selectedFile = useSelectedFileStore((store) => store.selectedFile);
	const setSelectedFile = useSelectedFileStore((store) => store.setSelectedFile);

	useEffect(() => {
		let startY: number, changeY: number, startMS: number;
		let enlarged = document.getElementById('enlarged-img')!;
		let locked: boolean;

		if (selectedFile) enlarged.style.top = `0px`;

		let handleTouchStart = (e: TouchEvent) => {
			startY = e.touches[0].clientY;
			startMS = Date.now();
			locked = true;
		};
		let handleTouchMove = (e: TouchEvent) => {
			if (!startY) return;

			let deltaY = e.touches[0].clientY;
			if (changeY > 50) locked = false;

			changeY = deltaY - startY;

			if (!locked) enlarged.style.top = `${changeY >= 0 ? changeY : 0}px`;
		};

		let handleTouchEnd = () => {
			if (!selectedFile) return;

			let currentMS = Date.now();

			if (changeY > 200 || Math.abs(startMS - currentMS) < 100) {
				setSelectedFile(undefined);
			} else {
				enlarged.style.top = '0px';
			}

			if (!locked) return;
		};

		let ctrl = new AbortController();
		let signal = ctrl.signal;

		document.addEventListener('touchstart', handleTouchStart, { passive: false, signal });
		document.addEventListener('touchmove', handleTouchMove, { passive: false, signal });
		document.addEventListener('touchend', handleTouchEnd, { signal });

		return () => {
			ctrl.abort();
		};
	}, []);
}
