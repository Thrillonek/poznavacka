import { usePoznavackaStore } from 'src/data';
import { getContent } from 'src/utils';
import { useChosenFileStore } from '../data/stores';
import { scrollListToItem } from './scrollListToItem';

/**
 * Changes the chosen file in the list. Scrolls the list, so that the file is visible when the user closes the enlarged mode.
 * @param condition - Defines the direction that the carousel will move.
 */
export function changeChosenFile(condition: 'left' | 'right') {
	const { chosenFile, setChosenFile } = useChosenFileStore.getState();
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	let files = getContent(poznavacka!);
	let idx = chosenFile && files.indexOf(chosenFile);

	if (condition === 'right') {
		idx == files.length - 1 ? (idx = 0) : idx++;
	} else if (condition === 'left') {
		idx == 0 ? (idx = files.length - 1) : idx--;
	}

	setChosenFile(files[idx]);
	scrollListToItem(files[idx]);
}
