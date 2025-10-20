/**
 * Returns the minimum and maximum value of the range, based on selected settings.
 *
 * @param {{ presets, files, settings }} - An object containing all the necessary data.
 */
export function getMinMax({ presets, files, settings }) {
	let min, max;

	if (settings?.quiz.mode == 'custom') {
		min = parseInt(settings?.quiz.min) || 1;
		max = parseInt(settings?.quiz.max) || files.length;
	}

	if (settings?.quiz.mode == 'preset') {
		min = 1;
		max = presets.length * 10;
		if (presets.length == 0) max = files.length;
	}

	return { min, max };
}
