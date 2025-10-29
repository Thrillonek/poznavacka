import type { PointerEvent } from 'react';
import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useSettingsStatusStore } from '../../data/stores';

export function handlePointerMove(e: PointerEvent) {
	const activeRangeValue = useSettingsStatusStore.getState().activeRangeValue;
	if (!activeRangeValue) return;

	const rangeRect = document.getElementById('size-range')!.getBoundingClientRect();
	const files = getFiles();
	const { min, max } = useSettingsStore.getState().settings.quiz;
	const { updateQuizSettings } = useSettingsStore.getState();

	const pos = { x: e.clientX || e.clientX, y: e.clientY || e.clientY };

	let calculation = Math.round(((pos.x - rangeRect.left) * (files.length - 1)) / rangeRect.width) + 1;
	if (calculation > files.length) calculation = files.length;
	if (calculation < 1) calculation = 1;
	if ((calculation == max && activeRangeValue == 'min') || (calculation == min && activeRangeValue == 'max')) return;
	updateQuizSettings(activeRangeValue, calculation);
}
