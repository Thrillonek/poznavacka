import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils/getFiles';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';
import { didPoznavackaChange, fileIndexHistory, previousFiles } from '../data/variables';
import { betterRNG } from '../utils/betterRNG';

export function changeImage(options) {
	const settings = useSettingsStore.getState().settings;
	const setError = useQuizErrorStore.getState().setError;
	const { setFileIndex, toggleFileNameRevealed } = useQuizFileStore.getState();

	const files = getFiles();

	options?.show != undefined && toggleFileNameRevealed(options.show);

	let minInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.min) || 1 : 1;
	let maxInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.max) || files.length : settings?.quiz.presets.length * 10;

	let range = maxInt - minInt + 1;

	if (didPoznavackaChange.current) {
		fileIndexHistory.recent = [];
		fileIndexHistory.main = [];
		if (settings.quiz.mode == 'custom') {
			for (let i = 1; i <= range; i++) {
				let val = i + minInt - 1;
				if (settings.quiz.complete?.includes(files[val - 1])) continue;
				fileIndexHistory.main.push(val);
			}
		} else if (settings.quiz.mode == 'preset') {
			for (let i of settings?.quiz.presets) {
				for (let val = (i - 1) * 10 + 1; val <= i * 10; val++) {
					if (settings.quiz.complete?.includes(files[val - 1])) continue;
					fileIndexHistory.main.push(val);
				}
			}
		}
	}

	setError(null);
	if (settings?.quiz.mode == 'custom') {
		if (maxInt <= minInt || (!settings?.quiz.max && minInt >= files?.length) || (!settings?.quiz.min && maxInt < 1)) return setError('Dolní hranice musí být nižší než ta horní');
		if (minInt < 1) return setError('Dolní hranice nemůže být nižší než 1');
		if (!options.firstChange && maxInt > files.length) return setError('Horní hranice nemůže být vyšší než ' + files.length);
	} else if (settings?.quiz.mode == 'preset') {
		if (settings?.quiz.presets.length == 0) {
			minInt = 1;
			maxInt = files.length;
		}
	}

	let idx;

	// if (previousFiles.length > 1 && previousFiles[0] + 1 == index.number) {
	// 	idx = previousFiles[1];
	// } else {
	if (fileIndexHistory.main.length + fileIndexHistory.recent.length == 0) return setError('V této sadě už nic nezbylo.');
	if (settings?.quiz.random) {
		idx = betterRNG(minInt, maxInt);
	} else {
		if (prevIdx.current == null || prevIdx.current >= fileIndexHistory.main.length - (options.complete ? 0 : 1) || didPoznavackaChange.current) {
			idx = 0;
		} else {
			// console.log(prevIdx.current);
			idx = prevIdx.current + (options.complete ? 0 : 1);
		}
		// while (settings.quiz?.complete.includes(fileHistory.main[idx])) {
		// 	if (idx == range - 1) {
		// 		idx = 0;
		// 	} else {
		// 		idx++;
		// 	}
		// }
		prevIdx.current = idx;
		idx = fileIndexHistory.main[idx];
	}

	// try {
	// 	if (settings?.quiz.mode == 'preset' && settings?.quiz.presets.length != 0) idx = settings?.quiz.presets?.[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];
	// } catch (e) {
	// 	console.log(e);
	// }

	if (previousFiles.length >= 2) previousFiles.shift();
	previousFiles?.push(idx);

	if (didPoznavackaChange.current) {
		didPoznavackaChange.current = false;
	}

	setFileIndex(idx);
}
