import { useEffect } from 'react';

/**
 * Adds an event listener to an element using useEffect, and aborts it when the component unmounts
 * @param eventName Name of the event to listen to
 * @param callback The function that runs each time the event is triggered
 * @param dependencies Array of every immutable variable used inside the function
 * @param target The element that will listen to the event (default: document)
 */
export function useAddEventListener(eventName, callback, dependencies = [], target = document) {
	useEffect(() => {
		const eventController = new AbortController();

		target.addEventListener(eventName, callback, { signal: eventController.signal });

		return () => {
			eventController.abort();
		};
	}, dependencies);
}
