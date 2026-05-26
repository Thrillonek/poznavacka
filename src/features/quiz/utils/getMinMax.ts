import type { SettingsStore } from 'src/types/settings';

/**
 * Returns the minimum and maximum value of the range, based on selected settings.
 *
 * @param {{ presets, files, settings }} - An object containing all the necessary data.
 */
export function getMinMax({ files, settings }: { files: string[]; settings: SettingsStore['settings'] }) {
	let min: number, max: number;

	min = settings.quiz.min || 1;
	max = settings.quiz.max || files.length;

	return { min, max };
}
