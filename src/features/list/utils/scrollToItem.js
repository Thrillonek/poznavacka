import { nameFromPath } from 'src/utils';
import { useListSearchStore } from '../data/stores';
import { getFiles } from './getFiles';

export function scrollToItem(e) {
	e.preventDefault();

	const searchInput = useListSearchStore.getState().searchInput;
	if (!searchInput) return;

	const files = getFiles();

	const list = document.getElementById('list');
	let searchedItemIndex;

	function searchCondition(fileName) {
		for (const i of nameFromPath(fileName).toLowerCase().split(' ')) {
			if (i.startsWith(searchInput.toLowerCase())) return true;
		}
		return false;
	}

	if (/\D/.test(searchInput)) {
		//pokud hledaný výraz není číslo
		let plant = files.find(searchCondition);
		if (!plant) return;
		searchedItemIndex = files.indexOf(plant) + 1;
	} else {
		searchedItemIndex = parseInt(searchInput);
	}

	let searchedItem = document.getElementById('list-item-' + searchedItemIndex);
	let searchedItemRect = searchedItem.getBoundingClientRect();
	let listRect = list.getBoundingClientRect();

	// IF BROWSING CATEGORIES (EXPERIMENTAL FEATURE) IS TURNED ON - NOT WORKING
	// if (browseCategories) {
	// 	for (const [key, val] of Object.entries(plantGroupNames)) {
	// 		if (val.toLowerCase().startsWith(searchInput.toLowerCase())) {
	// 			searchedItemIndex = val;
	// 			break;
	// 		}
	// 	}
	// 	rect = document.getElementById('cat-' + searchedItemIndex).getBoundingClientRect();
	// }
	list.scrollTop += searchedItemRect.top - listRect.top;
}
