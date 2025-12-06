import type { MutableRefObject } from 'react';
import type { RangeInputProps } from '../../components/ui/RangeInput';

export function adjustMin(minRef: MutableRefObject<HTMLInputElement | undefined>, props: RangeInputProps) {
	const { value } = minRef.current!;
	const { setMin } = props;

	if (/\D/g.test(value) || value.length === 0 || parseInt(value) < 1) {
		minRef.current!.value = '1';
		return setMin(1);
	}
	setMin(parseInt(value));
}

export function adjustMax(maxRef: MutableRefObject<HTMLInputElement | undefined>, props: RangeInputProps) {
	const { value } = maxRef.current!;
	const { set, setMax } = props;

	if (/\D/g.test(value) || value.length === 0 || parseInt(value) > set.length) {
		maxRef.current!.value = set.length.toString();
		return setMax(set.length);
	}
	setMax(parseInt(value));
}
