import type { MutableRefObject } from 'react';
import type { MinMaxInputProps } from 'src/components/form/MinMaxInput';
import type { RangeInputProps } from 'src/components/form/RangeInput';

export function adjustMin(minRef: MutableRefObject<HTMLInputElement | undefined>, props: MinMaxInputProps) {
	const { value } = minRef.current!;
	const { setMin, max } = props;

	if (/\D/g.test(value) || value.length === 0 || parseInt(value) < 1) {
		return setMin(1);
	}
	if (parseInt(value) >= max) return setMin(max - 1);
	setMin(parseInt(value));
}

export function adjustMax(maxRef: MutableRefObject<HTMLInputElement | undefined>, props: MinMaxInputProps) {
	const { value } = maxRef.current!;
	const { set, setMax, min } = props;

	if (/\D/g.test(value) || value.length === 0 || parseInt(value) > set.length) {
		return setMax(set.length);
	}

	if (parseInt(value) <= min) return setMax(min + 1);
	setMax(parseInt(value));
}

export function adjustValue(props: RangeInputProps) {
	// const { size, value, setValue } = props;
	// setValue(parseInt(inputValue));
}
