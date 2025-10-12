import { useEffect, useState } from 'react';

export function useDetectSwipe() {
	const [swipe, setSwipe] = useState({ switch: false, direction: '' });

	function changeDirection(newDirection) {
		setSwipe((prev) => ({ switch: !prev.switch, direction: newDirection }));
	}

	useEffect(() => {
		let startX, startY, changeX, changeY, startMS;

		let handleTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startMS = Date.now();
		};
		let handleTouchMove = (e) => {
			if (!startX) return;
			let deltaX = e.touches[0].clientX;
			let deltaY = e.touches[0].clientY;
			changeX = deltaX - startX;
			changeY = deltaY - startY;
		};
		let handleTouchEnd = (e) => {
			if (Date.now() - startMS > 500 || Math.abs(changeY) >= Math.abs(changeX) || Math.abs(changeX) < 20) return;
			if (changeX > 0) {
				changeDirection('right');
			} else if (changeX < 0) {
				changeDirection('left');
			}
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

	return swipe;
}
