import { useEffect } from 'react';

export function useAddEvent(eventName, callback, dependencies = [], target = document) {
	useEffect(() => {
		const eventController = new AbortController();

		target.addEventListener(eventName, callback, { signal: eventController.signal });

		return () => {
			eventController.abort();
		};
	}, dependencies);
}
