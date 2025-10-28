import type { SettingsStore } from 'src/types/stores';

/**
 * Returns the minimum and maximum value of the range, based on selected settings.
 *
 * @param {{ presets, files, settings }} - An object containing all the necessary data.
 */
export function getMinMax({ presets, files, settings }: { presets: number[]; files: string[]; settings: SettingsStore['settings'] }) {
	let min: number, max: number;

	if (settings?.quiz.mode == 'custom') {
		min = settings?.quiz.min || 1;
		max = settings?.quiz.max || files.length;
	} else {
		/*if (settings?.quiz.mode == 'preset')*/
		min = 1;
		max = presets.length * 10;
		if (presets.length == 0) max = files.length;
	}

	return { min, max };
}
