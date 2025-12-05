import { useEffect } from 'react';
import { useMenuElementStore, useSwipeLockStore } from 'src/data';
import { useChosenFileStore } from '../data/stores';

export function useLockSwiping() {
	const unlockSwiping = useSwipeLockStore((store) => store.unlockSwiping);
	const lockSwiping = useSwipeLockStore((store) => store.lockSwiping);

	const toggleHideMenu = useMenuElementStore((store) => store.toggleHideMenu);

	const isChosenFileSet = useChosenFileStore((store) => store.isSet);

	useEffect(() => {
		if (isChosenFileSet) {
			if (window.innerWidth < 1024) toggleHideMenu(true);
			lockSwiping();
		} else {
			unlockSwiping();
			toggleHideMenu(false);
		}
	}, [isChosenFileSet]);
}
