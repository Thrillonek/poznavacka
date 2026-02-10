import { usePoznavackaStore } from 'src/data';
import { getContent, isObject } from 'src/utils';

/**
 * Returns array of the current files in `poznavacka` store.
 */
export function getFiles(withBasePoznavacka?: boolean): string[] {
	const { poznavacka, basePoznavacka } = usePoznavackaStore.getState();
	const content = getContent(withBasePoznavacka ? basePoznavacka! : poznavacka!);
	if (!content || !content.length) return [];

	return content.filter((f: any) => !isObject(f));
}
