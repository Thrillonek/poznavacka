import type { MutableRefObject, PointerEvent } from 'react';
import type { RangeInputProps } from '../../components/ui/RangeInput';

type Refs = Record<string, MutableRefObject<HTMLDivElement | undefined>>;
export function handleRangePointerDown(e: PointerEvent<HTMLDivElement>, refs: Refs, props: RangeInputProps, setActiveRange: (x: string) => void) {
	if (Object.values(refs).some((val) => val.current == undefined)) return;

	const minInputRect = refs.minRangeRef.current!.getBoundingClientRect();
	const maxInputRect = refs.maxRangeRef.current!.getBoundingClientRect();
	const rangeInputRect = refs.rangeSliderRef.current!.getBoundingClientRect();

	const minInputCenter = minInputRect.left + minInputRect.width / 2;
	const maxInputCenter = maxInputRect.left + maxInputRect.width / 2;

	const deltaMin = Math.abs(e.clientX - minInputCenter);
	const deltaMax = Math.abs(e.clientX - maxInputCenter);

	const relativePosition = (e.clientX - rangeInputRect.left) / rangeInputRect.width;

	if (deltaMin > deltaMax) {
		setActiveRange('max');
		props.setMax(Math.round(props.set.length * relativePosition));
	} else {
		setActiveRange('min');
		props.setMin(Math.round(props.set.length * relativePosition));
	}
}
