import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { getContent } from 'src/utils';
import { checkPoznavackaIncludes } from 'src/utils/checkPoznavackaIncludes';
import { extractNestedContent } from './toggleFolderNesting';

function mutateSet(operation: 'add' | 'remove', content: Folder, extractNested: boolean) {
	if (!content) return;
	const { poznavacka, setPoznavacka } = usePoznavackaStore.getState();

	const additionalImages = extractNested ? extractNestedContent(content) : (getContent(content).filter((f: any): f is string => typeof f === 'string') as string[]);
	let newPoznavacka = poznavacka ? [...(getContent(poznavacka) as string[])] : [];

	if (operation === 'add') {
		newPoznavacka.push(...additionalImages);
	}
	if (operation === 'remove') {
		newPoznavacka = newPoznavacka.filter((f: string) => !additionalImages.includes(f));
	}

	setPoznavacka({ multiple: [...new Set(newPoznavacka)] });
}

export function addSet(content: Folder, extractNested = true) {
	mutateSet('add', content, extractNested);
}

export function removeSet(content: Folder, extractNested = true) {
	mutateSet('remove', content, extractNested);
}

/**
 * Toggles a set in poznavacka.
 * @param content The set.
 * @param extractNested Whether or not to extract nested content from the set. **Defaults to true.**
 */
export function toggleSet(content: Folder, extractNested = true) {
	const poznavacka = usePoznavackaStore.getState().poznavacka;

	if (!poznavacka || checkPoznavackaIncludes(extractNested ? extractNestedContent(content!) : (getContent(content!) as string[]), poznavacka)) {
		removeSet(content, extractNested);
	} else {
		addSet(content, extractNested);
	}
}
