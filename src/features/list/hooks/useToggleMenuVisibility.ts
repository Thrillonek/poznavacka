import { useEffect } from 'react';
import { useMenuElementStore } from 'src/data';
import { useSelectedFileStore } from '../data/stores';

export function useToggleMenuVisibility() {
	const toggleHideMenu = useMenuElementStore((store) => store.toggleHideMenu);

	const isSelectedFileSet = useSelectedFileStore((store) => store.isShown);

	useEffect(() => {
		if (isSelectedFileSet) {
			if (window.innerWidth < 800) toggleHideMenu(true);
		} else {
			toggleHideMenu(false);
		}
	}, [isSelectedFileSet]);
}
