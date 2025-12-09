import type { MutableRefObject, PointerEvent } from 'react';
import type { RangeInputProps } from '../../components/form/RangeInput';

type Refs = Record<string, MutableRefObject<HTMLDivElement | undefined>>;
export function handlePointerMove(e: PointerEvent, refs: Refs, props: RangeInputProps, activeRange: string) {
	if (!activeRange) return;
	if (!refs.rangeSliderRef.current) return;

	const rangeRect = refs.rangeSliderRef.current.getBoundingClientRect();
	const { min, max, setMin, setMax, set } = props;

	const pos = { x: e.clientX, y: e.clientY };

	let calculation = Math.round(((pos.x - rangeRect.left) * (set.length - 1)) / rangeRect.width) + 1;
	if (calculation > set.length) calculation = set.length;
	if (calculation < 1) calculation = 1;

	if (activeRange == 'min') {
		if (calculation >= max) {
			setMin(max - 1);
		} else {
			setMin(calculation);
		}
	}
	if (activeRange == 'max') {
		if (calculation <= min) {
			setMax(min + 1);
		} else {
			setMax(calculation);
		}
	}
}
