import { usePoznavackaStore } from '@/data';
import { objFirstValue } from '@/utils';
import { useChosenFileStore } from '../data/stores';

export function changeChosenFile(condition) {
	const { chosenFile, setChosenFile } = useChosenFileStore.getState();
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	let files = objFirstValue(poznavacka);
	let idx = chosenFile && files.indexOf(chosenFile);

	if (condition.right) {
		idx == files.length - 1 ? (idx = 0) : idx++;
	} else if (condition.left) {
		idx == 0 ? (idx = files.length - 1) : idx--;
	}

	setChosenFile(files[idx]);
	const targetElement = document.getElementById('plant-' + idx);
	if (!targetElement) return;
	let rect = targetElement.getBoundingClientRect();
	let list = document.getElementById('list');
	let listRect = list.getBoundingClientRect();
	list.scrollTop += rect.top - listRect.top - listRect.height / 2;
}
