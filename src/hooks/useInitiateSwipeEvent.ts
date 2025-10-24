import { useEffect } from 'react';

/**
 * Creates the custom:swipe event on the document element.
 */
export function useInitiateSwipeEvent() {
	useEffect(() => {
		let startX: number, startY: number, changeX: number, changeY: number, startMS: number;

		let handleTouchStart = (e: TouchEvent) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startMS = Date.now();
		};

		let handleTouchMove = (e: TouchEvent) => {
			if (!startX) return;
			let deltaX = e.touches[0].clientX;
			let deltaY = e.touches[0].clientY;
			changeX = deltaX - startX;
			changeY = deltaY - startY;
		};

		let handleTouchEnd = () => {
			if (Date.now() - startMS > 500) return; // PREVENTS EVENT IF SWIPE IS TOO SLOW
			if (Math.abs(changeY) < 20 && Math.abs(changeX) < 20) return; // PREVENTS EVENT IF SWIPE IS TOO INSIGNIFICANT
			if (Math.abs(Math.abs(changeX) - Math.abs(changeY)) < 20) return; // PREVENTS SWIPE IF THE DIRECTION IS NOT UNAMBIGUOUS

			let direction;
			if (Math.abs(changeY) < Math.abs(changeX)) {
				if (changeX > 0) {
					direction = 'right';
				} else if (changeX < 0) {
					direction = 'left';
				}
			} else if (Math.abs(changeY) > Math.abs(changeX)) {
				if (changeY > 0) {
					direction = 'down';
				} else if (changeY < 0) {
					direction = 'up';
				}
			}

			const swipeEvent = new CustomEvent('custom:swipe', { detail: { direction } });
			document.dispatchEvent(swipeEvent);
		};

		const eventController = new AbortController();
		let signal = eventController.signal;

		document.addEventListener('touchstart', handleTouchStart, { passive: false, signal });
		document.addEventListener('touchmove', handleTouchMove, { passive: false, signal });
		document.addEventListener('touchend', handleTouchEnd, { signal });

		return () => {
			eventController.abort();
		};
	}, []);
}
