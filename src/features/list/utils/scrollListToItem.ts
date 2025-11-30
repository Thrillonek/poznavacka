import { getFiles } from 'src/utils';

export function scrollListToItem(item: string) {
	const files = getFiles();

	const list = document.getElementById('list')!;
	let searchedItemIndex;

	searchedItemIndex = files.indexOf(item) + 1;

	let searchedElement = document.getElementById('list-item-' + searchedItemIndex)!;
	let searchedItemRect = searchedElement.getBoundingClientRect();
	let listRect = list.getBoundingClientRect();

	//? IF BROWSING CATEGORIES (EXPERIMENTAL FEATURE) IS TURNED ON - NOT WORKING
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
