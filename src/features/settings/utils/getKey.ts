import { capitalize } from 'src/utils';

export const getKey = (key: string) => {
	switch (key) {
		case 'ArrowUp':
			return '↑';
		case 'ArrowDown':
			return '↓';
		case 'ArrowLeft':
			return '‹';
		case 'ArrowRight':
			return '›';
		case ' ':
			return 'Space';
	}
	return capitalize(key);
};
