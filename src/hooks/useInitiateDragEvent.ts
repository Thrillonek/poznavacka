import { useEffect } from 'react';

/**
 * Creates the custom:drag event on the document element.
 */
export function useInitiateDragEvent() {
	useEffect(() => {
		let startX: number, startY: number;
		let isActive: boolean = false;

		let handlePointerDown = (e: PointerEvent) => {
			startX = e.clientX;
			startY = e.clientY;
			isActive = true;
		};

		let handlePointerMove = (e: PointerEvent) => {
			if (!startX || !startY || !isActive) return;
			let deltaX = e.clientX - startX;
			let deltaY = e.clientY - startY;

			const swipeEvent = new CustomEvent('custom:drag', { detail: { deltaX, deltaY } });
			document.dispatchEvent(swipeEvent);
		};

		let handlePointerUp = () => {
			isActive = false;
		};

		const eventController = new AbortController();
		let signal = eventController.signal;

		document.addEventListener('pointerdown', handlePointerDown, { passive: false, signal });
		document.addEventListener('pointermove', handlePointerMove, { passive: false, signal });
		document.addEventListener('pointerup', handlePointerUp, { signal });

		return () => {
			eventController.abort();
		};
	}, []);
}
