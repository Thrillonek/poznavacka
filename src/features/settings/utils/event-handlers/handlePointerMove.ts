import type { MutableRefObject, PointerEvent } from 'react';
import type { RangeInputProps } from '../../components/ui/RangeInput';

type Refs = Record<string, MutableRefObject<HTMLDivElement | undefined>>;
export function handlePointerMove(e: PointerEvent, refs: Refs, props: RangeInputProps, activeRange: string) {
	if (!activeRange) return;
	if (!refs.rangeSliderRef.current) return;

	const rangeRect = refs.rangeSliderRef.current.getBoundingClientRect();
	const { min, max } = props;

	const pos = { x: e.clientX, y: e.clientY };

	let calculation = Math.round(((pos.x - rangeRect.left) * (props.set.length - 1)) / rangeRect.width) + 1;
	if (calculation > props.set.length) calculation = props.set.length;
	if (calculation < 1) calculation = 1;
	if ((calculation == max && activeRange == 'min') || (calculation == min && activeRange == 'max')) return;

	if (activeRange == 'min') props.setMin(calculation);
	if (activeRange == 'max') props.setMax(calculation);
}
