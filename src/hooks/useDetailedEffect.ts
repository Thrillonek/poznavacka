import { useEffect, useRef } from 'react';

export function useDetailedEffect(callback: (firstRender?: boolean) => void | (() => void), dependencies?: React.DependencyList) {
	const firstRender = useRef(true);

	useEffect(() => {
		firstRender.current = true;
	}, []);

	useEffect(() => {
		const returnFunction = callback(firstRender.current);
		if (firstRender.current) {
			firstRender.current = false;
		}

		if (typeof returnFunction === 'function') return returnFunction();
	}, dependencies);
}
