import { nameFromPath } from 'src/utils';
import { getFiles } from '../../../utils/getFiles';
import { useListSearchStore } from '../data/stores';

/**
 * Checks if the given file name matches the current search input.
 * @param fileName - The file name to check.
 */
export function checkIsSearched(fileName) {
	const searchInput = useListSearchStore.getState().searchInput;
	if (!searchInput) return false;

	for (const word of nameFromPath(fileName).split(' ')) {
		if (word.toLowerCase().startsWith(searchInput.toLowerCase())) return true;
	}
	return false;
}

/**
 * Handles the search form submission.
 * If the search input is a number, it scrolls to the item with that index.
 * If the search input is a string, it finds the first item that contains a word starting with the search input.
 * @param e - The event triggered when the search form is submitted.
 */
export function searchItem(e) {
	e.preventDefault();

	const searchInput = useListSearchStore.getState().searchInput;
	if (!searchInput) return;

	const files = getFiles();

	const list = document.getElementById('list');
	let searchedItemIndex;

	if (/\D/.test(searchInput)) {
		//pokud hledaný výraz není číslo
		let plant = files.find(checkIsSearched);
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
