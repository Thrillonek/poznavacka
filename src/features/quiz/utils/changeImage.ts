import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils/getFiles';
import { useQuizErrorStore, useQuizFileStore, useQuizRandomIndexStore } from '../data/stores';
import { currentIndex, fileIndexList } from '../data/variables';
import { betterRNG, getMinMax } from './index';

/**
 * Changes the current image in the quiz, toggles the filename reveal state based on `showImage` param and handles errors.
 * @param [options] - Optional object with properties:
 *   - showImage - Whether to show the new image or not. Default is false.
 */

export function changeImage({ firstImage = false, complete = false }: { firstImage?: boolean; complete?: boolean } = {}) {
	const settings = useSettingsStore.getState().settings;
	const { setFileIndex, toggleFileNameRevealed } = useQuizFileStore.getState();

	const files = getFiles();

	toggleFileNameRevealed(false);

	const { min, max } = getMinMax({ files, settings });

	const isValid = handleErrors();
	if (!isValid) return;

	let newIndex = generateNewIndex({ min, max, firstImage, completed: complete });

	setFileIndex(newIndex);
}

function generateNewIndex({ min, max, firstImage, completed }: { min: number; max: number; firstImage: boolean; completed: boolean }) {
	const { preload: preloadedIndexes, current, setCurrent, setHistory, setPreload } = useQuizRandomIndexStore.getState();
	const settings = useSettingsStore.getState().settings;

	let index: number;
	if (settings.quiz.random) {
		if (firstImage) {
			index = current!;
		} else {
			index = preloadedIndexes[0];
			if (!completed) setHistory((prev) => [current!, ...prev].slice(0, 5));
			setCurrent(preloadedIndexes[0]);
			setPreload((prev) => {
				if (completed) {
					let newArray = prev.filter((x) => x !== current);
					for (let i = 0; i < prev.length - newArray.length; i++) {
						newArray.push(betterRNG(min, max));
					}
					return [...newArray, betterRNG(min, max)].slice(1);
				}

				return [...prev, betterRNG(min, max)].slice(1, 6);
			});
		}
	} else {
		function increaseIndex(index: number, firstImage: boolean = false): number {
			let newIndex = firstImage ? index : (index + 1) % fileIndexList.main.length;
			currentIndex.current = newIndex;

			if (fileIndexList.main[newIndex] === null) {
				return increaseIndex(newIndex);
			} else {
				return newIndex;
			}
		}
		index = increaseIndex(currentIndex.current ?? 0, firstImage);
		index = fileIndexList.main[index] as number;
	}
	return index;
}

function handleErrors() {
	const setError = useQuizErrorStore.getState().setError;

	function invalidate(message: string) {
		setError(message);
		return false;
	}

	setError('');

	if (fileIndexList.main.filter((v) => v !== null).length + fileIndexList.recent.filter((v) => v !== null).length === 0) invalidate('Všechny soubory v této sadě máš naučené!');

	return true;
}
