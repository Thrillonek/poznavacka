import { useQuizFileStore } from '../data/stores';
import { previousFiles } from '../data/variables';

export function showPreviousFile() {
	const { setFileIndex } = useQuizFileStore.getState();

	if (settings.quiz.random) {
		if (!(previousFiles.length > 1)) return;
		if (isPreviousAvailable) {
			setFileIndex(previousFiles[0]);
		} else {
			setFileIndex(previousFiles[1]);
		}
	} else {
		// let minInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.min) || 1 : 1;
		// let maxInt = settings?.quiz.mode == 'custom' ? parseInt(settings?.quiz.max) || files.length : settings?.quiz.presets.length * 10;
		// let idx;
		// if (prevIdx.current == null || prevIdx.current <= minInt - 1) {
		// 	idx = maxInt - 1;
		// } else {
		// 	idx = prevIdx.current - 1;
		// }
		// prevIdx.current = idx;
		// try {
		// 	if (settings?.quiz.mode == 'preset' && settings?.quiz.presets.length != 0) idx = settings?.quiz.presets?.[Math.floor(idx / 10)][idx - Math.floor(idx / 10) * 10];
		// } catch (e) {
		// 	console.log(e);
		// }ˇ
		let idx;
		if (prevIdx.current == null || prevIdx.current == 0) {
			idx = fileIndexHistory.main.length - 1;
		} else {
			idx = prevIdx.current - 1;
		}
		prevIdx.current = idx;
		idx = fileIndexHistory.main[idx];
		setFileIndex(idx);
	}
}
