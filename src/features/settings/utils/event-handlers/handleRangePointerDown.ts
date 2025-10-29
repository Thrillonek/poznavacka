import type { PointerEvent } from 'react';
import { useSettingsStore } from 'src/data';
import { useSettingsStatusStore } from '../../data/stores';

export function handleRangePointerDown(e: PointerEvent<HTMLDivElement>, files: string[]) {
	const activateRange = useSettingsStatusStore.getState().activateRange;
	const updateQuizSettings = useSettingsStore.getState().updateQuizSettings;

	const minInputRect = document.getElementById('size-min')!.getBoundingClientRect();
	const maxInputRect = document.getElementById('size-max')!.getBoundingClientRect();
	const rangeInputRect = document.getElementById('size-range')!.getBoundingClientRect();

	const minInputCenter = minInputRect.left + minInputRect.width / 2;
	const maxInputCenter = maxInputRect.left + maxInputRect.width / 2;

	const deltaMin = Math.abs(e.clientX - minInputCenter);
	const deltaMax = Math.abs(e.clientX - maxInputCenter);

	const relativePosition = (e.clientX - rangeInputRect.left) / rangeInputRect.width;

	if (deltaMin > deltaMax) {
		activateRange('max');
		updateQuizSettings('max', Math.round(files.length * relativePosition));
	} else {
		activateRange('min');
		updateQuizSettings('min', Math.round(files.length * relativePosition));
	}
}
