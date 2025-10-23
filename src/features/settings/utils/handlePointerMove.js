import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useRangeComponentStore } from '../data/stores';

const rangeRect = document.getElementById('size-range')?.getBoundingClientRect();
const files = getFiles();
const { min, max } = useSettingsStore.getState().settings.quiz;
const { updateQuizSettings } = useSettingsStore.getState();
export function handlePointerMove(e) {
	const { activeRangeValue } = useRangeComponentStore.getState();

	if (!activeRangeValue) return;
	const pos = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };

	let calculation = Math.round(((pos.x - rangeRect.left) * (files.length - 1)) / rangeRect.width) + 1;
	if (calculation > files.length) calculation = files.length;
	if (calculation < 1) calculation = 1;
	if ((calculation == max && activeRangeValue == 'min') || (calculation == min && activeRangeValue == 'max')) return;
	updateQuizSettings(activeRangeValue, calculation);
}
