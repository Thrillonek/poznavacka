import type { FormEvent } from 'react';
import { nameFromPath } from 'src/utils';
import { getFiles } from '../../../utils/getFiles';
import { useListSearchStore } from '../data/stores';

/**
 * Checks if the given file name matches the current search input.
 * @param fileName - The file name to check.
 */
export function checkIsSearched(fileName: string) {
	const searchInput = useListSearchStore.getState().searchInput;
	if (!searchInput) return false;

	for (const word of nameFromPath(fileName).split(' ')) {
		if (word.toLowerCase().startsWith(searchInput.toLowerCase())) return true;
	}
	if (getFiles().indexOf(fileName) + 1 == parseInt(searchInput)) return true;

	return false;
}

/**
 * Handles the search form submission.
 * If the search input is a number, it scrolls to the item with that index.
 * If the search input is a string, it finds the first item that contains a word starting with the search input.
 * @param e - The event triggered when the search form is submitted.
 * @param multiple - Whether to return an array of items or a single item.
 */
export function searchItem(e?: FormEvent, multiple: boolean = false) {
	if (e) e.preventDefault();

	const searchInput = useListSearchStore.getState().searchInput;
	if (!searchInput) return;

	const files = getFiles();

	let searchedItems = files.filter(checkIsSearched);

	if (multiple) {
		return searchedItems;
	} else {
		return searchedItems[0];
	}
}
