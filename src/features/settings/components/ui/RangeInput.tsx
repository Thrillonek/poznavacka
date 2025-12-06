import { useMemo, useRef, type KeyboardEvent, type LegacyRef } from 'react';
import classes from '../../assets/ui/_RangeInput.module.scss';
import { adjustMax, adjustMin } from '../../utils/event-handlers/adjustMinMax';

export type RangeInputProps = {
	min: number;
	max: number;
	set: any[];
	setMin: (value: number) => void;
	setMax: (value: number) => void;
};

function RangeInput(props: RangeInputProps) {
	const { min, max, set, setMin, setMax } = props;

	const minRef = useRef<HTMLInputElement>();
	const maxRef = useRef<HTMLInputElement>();

	function handleSubmitForm(e: KeyboardEvent<HTMLDivElement>) {
		if (e.key !== 'Enter') return;
		adjustMin(minRef, props);
		adjustMax(maxRef, props);
		minRef.current!.blur();
		maxRef.current!.blur();
	}

	function calcPosition(num: number) {
		const calculation = (num - 1) / (set.length - 1);
		return `calc(${calculation * 100}% - ${calculation * 3}px)`;
	}

	return (
		<div tabIndex={0} onKeyDown={handleSubmitForm} className={classes.container}>
			<div className={classes['input-container']}>
				<label className={classes['input-label']} htmlFor='min'>
					Min
				</label>
				<input id='min' ref={minRef as LegacyRef<HTMLInputElement>} onBlur={() => adjustMin(minRef, props)} onFocus={(e) => e.target.select()} className={classes.input} type='text' defaultValue={min} />
			</div>
			<div className={classes['range-container']}>
				<div className={classes['range-slider']}>
					<div style={{ left: calcPosition(min) }} className={classes['range-thumb']}>
						<div />
					</div>
					<div style={{ width: `${((max - min) / (set.length - 1)) * 100}%`, left: `${((min - 1) / (set.length - 1)) * 100}%` }} className={classes['range-active']} />
					<div style={{ left: calcPosition(max) }} className={classes['range-thumb']}>
						<div />
					</div>
				</div>
			</div>
			<div className={classes['input-container']}>
				<label className={classes['input-label']} htmlFor='max'>
					Max
				</label>
				<input id='max' ref={maxRef as LegacyRef<HTMLInputElement>} onBlur={() => adjustMax(maxRef, props)} onFocus={(e) => e.target.select()} className={classes.input} type='text' defaultValue={max} />
			</div>
		</div>
	);
}

export default RangeInput;
