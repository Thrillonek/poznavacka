import { useEffect } from 'react';
import { useChosenFileStore } from '../data/stores';

//NOT FINISHED - THE BASE OF A POTENTIAL SMOOTH SWIPE DOWN HOOK - SHOULD VISIBLY REACT TO EVERY TOUCH MOVE ON Y AXIS
export function useSmoothSwipeDown() {
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);

	useEffect(() => {
		let startY, changeY, startMS;
		let enlarged = document.getElementById('enlarged-img');
		let locked;

		if (chosenFile) enlarged.style.top = `0px`;

		let handleTouchStart = (e) => {
			startY = e.touches[0].clientY;
			startMS = Date.now();
			locked = true;
		};
		let handleTouchMove = (e) => {
			if (!startY) return;

			let deltaY = e.touches[0].clientY;
			if (changeY > 50) locked = false;

			changeY = deltaY - startY;

			if (!locked) enlarged.style.top = `${changeY >= 0 ? changeY : 0}px`;
		};

		let handleTouchEnd = (e) => {
			if (!chosenFile) return;

			let currentMS = Date.now();

			if (changeY > 200 || Math.abs(startMS - currentMS) < 100) {
				setChosenFile(null);
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
