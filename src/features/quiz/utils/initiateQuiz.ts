import { useCompletedFilesStore, usePresetStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { fileIndexList, previousIndex } from '../data/variables';
import { getMinMax } from './getMinMax';

/**
 * Prepares the quiz for the change of `poznavacka` variable.
 * Generates a new array of indexes for the quiz. The result depends on selected mode.
 * It also resets `previousIndex`.
 *
 * The function also skips files that are in the `completedFiles` array.
 */
export function initiateQuiz() {
	const settings = useSettingsStore.getState().settings;
	const presets = usePresetStore.getState().presets;
	const completedFiles = useCompletedFilesStore.getState().completedFiles;
	const files = getFiles();

	previousIndex.current = undefined;

	let { min, max } = getMinMax({ presets, files, settings });

	let range = max - min + 1;

	fileIndexList.recent = [];
	fileIndexList.main = [];
	if (settings.quiz.mode == 'custom' || (settings.quiz.mode == 'preset' && presets.length == 0)) {
		for (let i = 0; i < range; i++) {
			let val = i + min;
			if (completedFiles?.includes(files[val - 1])) continue;
			fileIndexList.main.push(val);
		}
	} else if (settings.quiz.mode == 'preset') {
		for (let i of presets) {
			for (let val = (i - 1) * 10 + 1; val <= i * 10; val++) {
				if (completedFiles?.includes(files[val - 1])) continue;
				fileIndexList.main.push(val);
			}
		}
	}
}
