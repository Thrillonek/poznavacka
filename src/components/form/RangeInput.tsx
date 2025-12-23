import { useEffect, useRef, useState, type KeyboardEvent, type LegacyRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import { adjustMin, adjustValue } from 'src/utils/form/adjustMinMax';
import { handlePointerMove } from 'src/utils/form/handlePointerMove';
import { handleRangePointerDown } from 'src/utils/form/handleRangePointerDown';
import classes from '../../assets/form/_RangeInput.module.scss';

export type RangeInputProps = {
	value: number;
	size: number;
	setValue: (value: number) => void;
};

function RangeInput(props: RangeInputProps) {
	const { value, size } = props; // setMin and setMax are used in util functions below

	const valueRef = useRef<HTMLInputElement>();

	const [activeRange, setActiveRange] = useState('');

	useEffect(() => {
		valueRef.current!.value = value.toString();
	}, [value]);

	function handleSubmitForm(e: KeyboardEvent<HTMLDivElement>) {
		if (e.key !== 'Enter') return;
		adjustValue(props);
	}

	function calcPosition(num: number) {
		const calculation = (num - 1) / (size - 1);
		return `calc(${calculation * 100}% - ${calculation * 3}px)`;
	}

	useAddEventListener('pointerup', () => setActiveRange(''));
	useAddEventListener('pointermove', () => {}, [activeRange]);
	useAddEventListener('touchmove', (e) => activeRange && e.preventDefault(), [activeRange], { passive: false });

	return (
		<div tabIndex={0} onKeyDown={handleSubmitForm} className={classes['container']}>
			<div onPointerDown={() => {}} className={classes['range-container']}>
				<div className={classes['range-slider']}>
					<div style={{ left: calcPosition(value) }} ref={valueRef as LegacyRef<any>} className={classes['range-thumb']}>
						<div />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RangeInput;
