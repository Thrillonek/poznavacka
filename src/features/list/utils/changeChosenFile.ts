import { useSettingsStore } from 'src/data';
import { useChosenFileStore, useListFilesStore } from '../data/stores';
import { scrollListToItem } from './scrollListToItem';

/**
 * Changes the chosen file in the list. Scrolls the list, so that the file is visible when the user closes the enlarged mode.
 * @param condition - Defines the direction that the carousel will move.
 */
export function changeChosenFile(condition: 'left' | 'right') {
	const { chosenFile, setChosenFile } = useChosenFileStore.getState();
	const { settings } = useSettingsStore.getState();

	const listFiles = useListFilesStore.getState().files;

	if (!chosenFile) return;

	let files = Object.values(listFiles);
	let idx = files.indexOf(chosenFile);

	const carousel = document.getElementById('selected-file-carousel')!;
	const previous = carousel.children[0] as HTMLElement;
	const current = carousel.children[1] as HTMLElement;
	const next = carousel.children[2] as HTMLElement;

	const translateDistance = 20;

	if (condition === 'right') {
		idx == files.length - 1 ? (idx = 0) : idx++;

		if (settings.list.showSelectedFileAnimations) {
			previous.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 0, fill: 'forwards' });
			previous.animate({ transform: `translateX(-${translateDistance}rem) scale(0.9) rotateY(-45deg)`, opacity: 0 }, { duration: 300, fill: 'forwards' });

			current.animate({ transform: `translateX(${translateDistance}rem) scale(0.9) rotateY(45deg)`, opacity: 0 }, { duration: 0, fill: 'forwards' });
			current.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 300, fill: 'forwards' });
		}
	} else if (condition === 'left') {
		idx == 0 ? (idx = files.length - 1) : idx--;

		if (settings.list.showSelectedFileAnimations) {
			next.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 0, fill: 'forwards' });
			next.animate({ transform: `translateX(${translateDistance}rem) scale(0.9) rotateY(45deg)`, opacity: 0 }, { duration: 300, fill: 'forwards' });

			current.animate({ transform: `translateX(-${translateDistance}rem) scale(0.9) rotateY(-45deg)`, opacity: 0 }, { duration: 0, fill: 'forwards' });
			current.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 300, fill: 'forwards' });
		}
	}

	setChosenFile(files[idx]);
	scrollListToItem(files[idx]);
}
