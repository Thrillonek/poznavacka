import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { getContent, getFolderName } from 'src/utils';
import { useSelectMultipleStore } from '../data/stores';
import { extractNestedContent } from './toggleFolderNesting';

function mutateSet(operation: 'add' | 'remove', content: Folder, extractNested: boolean) {
	if (!content) return;
	const { addSelectedItem, removeSelectedItem } = useSelectMultipleStore.getState();
	const { poznavacka, setPoznavacka } = usePoznavackaStore.getState();

	const additionalImages = extractNested ? extractNestedContent(content) : (getContent(content).filter((f: any): f is string => typeof f === 'string') as string[]);
	let newPoznavacka = poznavacka ? (getContent(poznavacka) as string[]) : [];

	if (operation === 'add') {
		newPoznavacka.push(...additionalImages);
		addSelectedItem(getFolderName(content));
	}
	if (operation === 'remove') {
		newPoznavacka = newPoznavacka.filter((f: string) => !additionalImages.includes(f));
		removeSelectedItem(getFolderName(content));
	}

	setPoznavacka({ multiple: newPoznavacka });
}

export function addSet(content: Folder, extractNested = true) {
	mutateSet('add', content, extractNested);
}

export function removeSet(content: Folder, extractNested = true) {
	mutateSet('remove', content, extractNested);
}
