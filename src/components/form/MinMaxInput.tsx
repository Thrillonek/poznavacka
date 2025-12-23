import { useEffect, useRef, useState, type KeyboardEvent, type LegacyRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import { adjustMax, adjustMin } from 'src/utils/form/adjustMinMax';
import { handlePointerMove } from 'src/utils/form/handlePointerMove';
import { handleRangePointerDown } from 'src/utils/form/handleRangePointerDown';
import classes from '../../assets/form/_RangeInput.module.scss';

export type MinMaxInputProps = {
	min: number;
	max: number;
	set: any[];
	setMin: (value: number) => void;
	setMax: (value: number) => void;
};

function MinMaxInput(props: MinMaxInputProps) {
	const { min, max, set } = props; // setMin and setMax are used in util functions below

	const minRef = useRef<HTMLInputElement>();
	const maxRef = useRef<HTMLInputElement>();
	const minRangeRef = useRef<HTMLDivElement>();
	const maxRangeRef = useRef<HTMLDivElement>();
	const rangeSliderRef = useRef<HTMLDivElement>();

	const [activeRange, setActiveRange] = useState('');

	useEffect(() => {
		minRef.current!.value = min.toString();
		maxRef.current!.value = max.toString();
	}, [min, max]);

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

	const refs = {
		minRangeRef,
		maxRangeRef,
		rangeSliderRef,
	};

	useAddEventListener('pointerup', () => setActiveRange(''));
	useAddEventListener('pointermove', (e) => handlePointerMove(e, refs, props, activeRange), [activeRange]);
	useAddEventListener('touchmove', (e) => activeRange && e.preventDefault(), [activeRange], { passive: false });

	return (
		<div tabIndex={0} onKeyDown={handleSubmitForm} className={classes['container']}>
			<div className={classes['input-container']}>
				<label className={classes['input-label']} htmlFor='min'>
					Min
				</label>
				<input id='min' ref={minRef as any} onBlur={() => adjustMin(minRef, props)} onFocus={(e) => e.target.select()} className={classes.input} type='text' defaultValue={min} />
			</div>

			<div onPointerDown={(e) => handleRangePointerDown(e, refs, props, setActiveRange)} className={classes['range-container']}>
				<div ref={rangeSliderRef as any} className={classes['range-slider']}>
					<div style={{ left: calcPosition(min) }} ref={minRangeRef as any} className={classes['range-thumb']}>
						<div />
					</div>

					<div style={{ width: `${((max - min) / (set.length - 1)) * 100}%`, left: `${((min - 1) / (set.length - 1)) * 100}%` }} className={classes['range-active']} />
					<div style={{ left: calcPosition(max) }} ref={maxRangeRef as any} className={classes['range-thumb']}>
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

export default MinMaxInput;
