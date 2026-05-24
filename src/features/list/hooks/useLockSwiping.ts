import { useEffect } from 'react';
import { useMenuElementStore } from 'src/data';
import { useChosenFileStore } from '../data/stores';

export function useLockSwiping() {
	const toggleHideMenu = useMenuElementStore((store) => store.toggleHideMenu);

	const isChosenFileSet = useChosenFileStore((store) => store.isSet);

	useEffect(() => {
		if (isChosenFileSet) {
			if (window.innerWidth < 800) toggleHideMenu(true);
		} else {
			toggleHideMenu(false);
		}
	}, [isChosenFileSet]);
}
