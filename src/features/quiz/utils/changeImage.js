import { usePresetStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils/getFiles';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { fileIndexList, previousFiles, previousIndex } from '../data/variables';
import { betterRNG } from './betterRNG';
import { getMinMax } from './getMinMax';

/**
 * Changes the current image in the quiz, toggles the filename reveal and handles errors.
 * @param [options] - Optional object with properties:
 *   - showImage - Whether to show the new image or not. Default is false.
 *   - complete - Only set to true when the file was added to the `completedFiles` array. Default is false.
 */

export function changeImage({ showImage = false, complete: isFileCompleted } = {}) {
	const settings = useSettingsStore.getState().settings;
	const presets = usePresetStore.getState().presets;
	const { setFileIndex, toggleFileNameRevealed } = useQuizFileStore.getState();

	const files = getFiles();

	toggleFileNameRevealed(showImage);

	const { min, max } = getMinMax({ presets, files, settings });

	const isValid = handleErrors({ files, settings, min, max });
	if (!isValid) return;

	//generace indexu nového
	let newIndex = generateNewIndex({ min, max, isFileCompleted, settings });

	if (previousFiles.length >= 2) previousFiles.shift();
	previousFiles?.push(newIndex);

	setFileIndex(newIndex);
}

function generateNewIndex({ min, max, isFileCompleted, settings }) {
	let idx;
	if (settings?.quiz.random) {
		idx = betterRNG(min, max);
	} else {
		if (previousIndex.current == null || previousIndex.current >= fileIndexList.main.length - (isFileCompleted ? 0 : 1)) {
			idx = 0;
		} else {
			idx = previousIndex.current + (isFileCompleted ? 0 : 1);
		}
		previousIndex.current = idx;
		idx = fileIndexList.main[idx];
	}
	return idx;
}

function handleErrors({ files, settings, min, max }) {
	const setError = useQuizErrorStore.getState().setError;

	function invalidate(message) {
		setError(message);
		return false;
	}

	setError(null);
	if (settings?.quiz.mode == 'custom') {
		if (max <= min || (!settings?.quiz.max && min >= files?.length) || (!settings?.quiz.min && max < 1)) invalidate('Dolní hranice musí být nižší než ta horní');
		if (min < 1) invalidate('Dolní hranice nemůže být nižší než 1');
		if (max > files.length) invalidate('Horní hranice nemůže být vyšší než ' + files.length);
	}

	if (fileIndexList.main.length + fileIndexList.recent.length == 0) invalidate('V této sadě už nic nezbylo.');

	return true;
}
