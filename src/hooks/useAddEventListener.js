import { useEffect } from 'react';

/**
 * Adds an event listener to an element using useEffect, and aborts it when the component unmounts
 * @param eventName Name of the event to listen to
 * @param callback The function that runs each time the event is triggered
 * @param dependencies Array of every immutable variable used inside the function
 * @param options
 * - target - The element that will listen to the event (default: document)
 * - passive - Whether the event listener is passive or not
 */
export function useAddEventListener(eventName, callback, dependencies = [], { target = document, passive } = {}) {
	useEffect(() => {
		const eventController = new AbortController();

		target.addEventListener(eventName, callback, { signal: eventController.signal, passive });

		return () => {
			eventController.abort();
		};
	}, dependencies);
}
