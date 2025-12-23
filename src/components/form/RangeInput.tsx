import { useEffect, useRef, useState, type MutableRefObject, type PointerEvent } from 'react';
import { useAddEventListener } from 'src/hooks';
import { getRelativePosition } from 'src/utils/form/handleRangePointerDown';
import classes from '../../assets/form/_MinMaxInput.module.scss';
import rangeClasses from '../../assets/form/_RangeInput.module.scss';

export type RangeInputProps = {
	value: number;
	size: number;
	setValue: (value: number) => void;
	tooltipFormat?: (text: string) => string;
};

function RangeInput(props: RangeInputProps) {
	const { value, size, setValue, tooltipFormat } = props; // setMin and setMax are used in util functions below

	const valueRef = useRef<HTMLInputElement>();
	const rangeSliderRef = useRef<HTMLDivElement>();

	const [isRangeActive, setIsRangeActive] = useState(false);

	useEffect(() => {
		valueRef.current!.value = value.toString();
	}, [value]);

	function calcPosition(num: number) {
		const calculation = num / size;
		return `calc(${calculation * 100}% - ${calculation * 3}px)`;
	}

	useAddEventListener('pointerup', () => setIsRangeActive(false));
	useAddEventListener('pointermove', (e) => isRangeActive && handleValueChange(e), [isRangeActive]);
	useAddEventListener('touchmove', (e) => isRangeActive && e.preventDefault(), [isRangeActive], { passive: false });

	const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
		setIsRangeActive(true);
		handleValueChange(e);
	};

	const handleValueChange = (e: PointerEvent<HTMLDivElement>) => {
		if (!isRangeActive) return;

		const newValue = Math.round(size * getRelativePosition(e, rangeSliderRef as MutableRefObject<HTMLDivElement>));
		if (newValue < 0 || newValue > size) return;
		return setValue(newValue);
	};

	return (
		<div className={classes['container']}>
			<div onPointerDown={handlePointerDown} className={classes['range-container']}>
				<div ref={rangeSliderRef as any} className={classes['range-slider']}>
					<div style={{ left: calcPosition(value) }} ref={valueRef as any} className={classes['range-thumb']}>
						<div className={rangeClasses['range-thumb-circle']} data-value={tooltipFormat ? tooltipFormat(value.toString()) : value} data-visible={isRangeActive} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default RangeInput;
