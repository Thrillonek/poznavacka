import { usePresetStore } from 'src/data';
import { getFiles } from 'src/utils';

export function checkAllPresets() {
	const files = getFiles();

	const { clearPresets, presets } = usePresetStore.getState();

	let allPresets = [];
	if (presets.length !== Math.round(files.length / 10)) {
		for (let num = 1; num <= Math.round(files.length / 10); num++) {
			allPresets.push(num);
		}
		usePresetStore.setState({ presets: allPresets });
	} else clearPresets();
}
