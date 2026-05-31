import { useSettingsStore } from 'src/data';
import { useListFilesStore, useSelectedFileStore } from '../data/stores';
import { scrollListToItem } from './scrollListToItem';

/**
 * Changes the chosen file in the list. Scrolls the list, so that the file is visible when the user closes the enlarged mode.
 * @param condition - Defines the direction that the carousel will move.
 */
export function changeSelectedFile(condition: 'left' | 'right') {
	const { selectedFile, setSelectedFile } = useSelectedFileStore.getState();
	const { settings } = useSettingsStore.getState();

	const listFiles = useListFilesStore.getState().files;

	if (!selectedFile) return;

	let files = Object.values(listFiles);
	let idx = files.indexOf(selectedFile);

	let carousel = document.getElementById('selected-file-carousel')!;
	let previous = carousel.children[0] as HTMLElement;
	let current = carousel.children[1] as HTMLElement;
	let next = carousel.children[2] as HTMLElement;

	let translateDistance = 20;

	if (condition === 'right') {
		idx++;

		if (settings.list.showSelectedFileAnimations) {
			previous!.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 0, fill: 'forwards' });
			previous!.animate({ transform: `translateX(-${translateDistance}rem) scale(0.9) rotateY(-45deg)`, opacity: 0 }, { duration: 300, fill: 'forwards' });

			current!.animate({ transform: `translateX(${translateDistance}rem) scale(0.9) rotateY(45deg)`, opacity: 0 }, { duration: 0, fill: 'forwards' });
			current!.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 300, fill: 'forwards' });
		}
	} else if (condition === 'left') {
		idx--;

		if (settings.list.showSelectedFileAnimations) {
			next!.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 0, fill: 'forwards' });
			next!.animate({ transform: `translateX(${translateDistance}rem) scale(0.9) rotateY(45deg)`, opacity: 0 }, { duration: 300, fill: 'forwards' });

			current!.animate({ transform: `translateX(-${translateDistance}rem) scale(0.9) rotateY(-45deg)`, opacity: 0 }, { duration: 0, fill: 'forwards' });
			current!.animate({ transform: `translateX(0) scale(1) rotateY(0deg)`, opacity: 1 }, { duration: 300, fill: 'forwards' });
		}
	}

	idx += files.length;
	idx %= files.length;

	setSelectedFile(files[idx]);
	scrollListToItem(files[idx]);
}
