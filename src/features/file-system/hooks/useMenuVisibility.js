import { useState } from 'react';

/**
 * @param {('toggle'|'hide'|'show')} action
 */
export function useMenuVisibility({ action } = {}) {
	const [isMenuVisible, setIsMenuVisible] = useState(true);

	if (!action) {
		return isMenuVisible;
	}
	switch (action) {
		case 'toggle':
			setIsMenuVisible(!isMenuVisible);
			break;
		case 'hide':
			setIsMenuVisible(false);
			break;
		case 'show':
			setIsMenuVisible(true);
			break;
	}
}
