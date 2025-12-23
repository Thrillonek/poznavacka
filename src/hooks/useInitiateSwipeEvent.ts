import { useEffect } from 'react';

/**
 * Creates the custom:swipe event on the document element.
 */
export function useInitiateSwipeEvent() {
	useEffect(() => {
		let startX: number, startY: number, deltaX: number, deltaY: number, startMS: number;

		let handleTouchStart = (e: TouchEvent) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startMS = Date.now();
			deltaX = 0;
			deltaY = 0;
		};

		let handleTouchMove = (e: TouchEvent) => {
			if (!startX) return;
			let newX = e.touches[0].clientX;
			let newY = e.touches[0].clientY;
			deltaX = newX - startX;
			deltaY = newY - startY;
		};

		let handleTouchEnd = () => {
			if (Date.now() - startMS > 500) return; // PREVENTS EVENT IF SWIPE IS TOO SLOW
			if (Math.abs(deltaY) < 20 && Math.abs(deltaX) < 20) return; // PREVENTS EVENT IF SWIPE IS TOO INSIGNIFICANT
			if (Math.abs(Math.abs(deltaX) - Math.abs(deltaY)) < 20) return; // PREVENTS SWIPE IF THE DIRECTION IS NOT UNAMBIGUOUS

			let direction;
			if (Math.abs(deltaY) < Math.abs(deltaX)) {
				if (deltaX > 0) {
					direction = 'right';
				} else if (deltaX < 0) {
					direction = 'left';
				}
			} else if (Math.abs(deltaY) > Math.abs(deltaX)) {
				if (deltaY > 0) {
					direction = 'down';
				} else if (deltaY < 0) {
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
