import type { SettingsStore } from 'src/types/settings';

/**
 * Returns the minimum and maximum value of the range, based on selected settings.
 *
 * @param {{ presets, files, settings }} - An object containing all the necessary data.
 */
export function getMinMax({ files, settings }: { files: string[]; settings: SettingsStore['settings'] }) {
	let min: number, max: number;

	min = Math.max(settings.quiz.min, 1) || 1;
	max = Math.min(settings.quiz.max, files.length) || files.length;

	if (settings.quiz.min > settings.quiz.max) return { min: 1, max: files.length };

	return { min, max };
}
