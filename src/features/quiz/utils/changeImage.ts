import { useSettingsStore } from 'src/data';
import type { SettingsStore } from 'src/types/settings';
import { getFiles } from 'src/utils/getFiles';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { currentIndex, fileIndexList, previousFiles } from '../data/variables';
import { betterRNG, getMinMax } from './index';

/**
 * Changes the current image in the quiz, toggles the filename reveal state based on `showImage` param and handles errors.
 * @param [options] - Optional object with properties:
 *   - showImage - Whether to show the new image or not. Default is false.
 */

export function changeImage({ firstImage = false }: { firstImage?: boolean } = {}) {
	const settings = useSettingsStore.getState().settings;
	const { setFileIndex, toggleFileNameRevealed, fileIndex } = useQuizFileStore.getState();

	const files = getFiles();

	toggleFileNameRevealed(false);

	console.log(fileIndexList);

	const { min, max } = getMinMax({ files, settings });

	const isValid = handleErrors({ settings, min, max });
	if (!isValid) return;

	let newIndex = generateNewIndex({ min, max, settings, increase: !firstImage });

	if (previousFiles.length >= 2) previousFiles.shift();
	previousFiles?.push(newIndex);

	setFileIndex(newIndex);
}

function generateNewIndex({ min, max, settings, increase }: { min: number; max: number; settings: SettingsStore['settings']; increase?: boolean }) {
	let index: number;
	if (settings?.quiz.random) {
		index = betterRNG(min, max);
		console.log('Generated index:', index);
	} else {
		function increaseIndex(index: number, increase: boolean = true): number {
			let newIndex = increase ? (index + 1) % fileIndexList.main.length : index;
			currentIndex.current = newIndex;

			if (fileIndexList.main[newIndex] === null) {
				return increaseIndex(newIndex);
			} else {
				return newIndex;
			}
		}
		index = increaseIndex(currentIndex.current ?? 0, increase);
		index = fileIndexList.main[index] as number;
	}
	return index;
}

function handleErrors({ settings, min, max }: { settings: SettingsStore['settings']; min: number; max: number }) {
	const setError = useQuizErrorStore.getState().setError;
	const files = getFiles();

	function invalidate(message: string) {
		setError(message);
		return false;
	}

	setError('');
	if (settings?.quiz.mode == 'custom') {
		if (max <= min || (!settings?.quiz.max && min >= files?.length) || (!settings?.quiz.min && max < 1)) invalidate('Dolní hranice musí být nižší než ta horní');
		if (min < 1) invalidate('Dolní hranice nemůže být nižší než 1');
		if (max > files.length) invalidate('Horní hranice nemůže být vyšší než ' + files.length);
	}

	if (fileIndexList.main.filter((v) => v !== null).length + fileIndexList.recent.filter((v) => v !== null).length === 0) invalidate('Všechny soubory v této sadě máš naučené!');

	return true;
}
