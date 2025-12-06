import { useEffect, useMemo, useState } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils';
import classes from '../../assets/ui/_RangeInput.module.scss';
import { useSettingsStatusStore } from '../../data/stores';
import { useUpdateRangeUI } from '../../hooks/useUpdateRangeUI';
import { handleChangeMinMax } from '../../utils';
import { handleFocusOut } from '../../utils/event-handlers/handleFocusOut';
import { handleRangePointerDown } from '../../utils/event-handlers/handleRangePointerDown';

function RangeInput() {
	const activeRangeValue = useSettingsStatusStore((store) => store.activeRangeValue);
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const { min, max } = settings.quiz;

	const [minMaxInput, setMinMaxInput] = useState<Record<string, number>>({ min, max });

	const files = useMemo(() => getFiles(), [poznavacka]);

	useEffect(() => {
		if (files) {
			useUpdateRangeUI(files, setMinMaxInput);
			useAddEventListener('focusout', () => handleFocusOut(files), [min, max]);
		}
	}, [files]);

	return (
		<div className={classes.container}>
			<div className={classes['input-container']}>
				<label className={classes['input-label']} htmlFor='min'>
					Min
				</label>
				<input id='min' className={classes.input} type='text' onChange={(e) => handleChangeMinMax(e, 'min')} value={min} />
			</div>
			<div className={classes['range-container']}>
				<div onPointerDown={(e) => handleRangePointerDown(e, files)} className={classes['range-slider']}>
					<div className={classes['range-thumb']}>
						<div />
					</div>
					<div className={classes['range-active']} />
					<div className={classes['range-thumb']}>
						<div />
					</div>
				</div>
			</div>
			<div className={classes['input-container']}>
				<label className={classes['input-label']} htmlFor='max'>
					Max
				</label>
				<input id='max' className={classes.input} type='text' onChange={(e) => handleChangeMinMax(e, 'max')} value={max} />
			</div>
			{/* 
			<div id='size-range' onPointerDown={(e) => handleRangePointerDown(e, files)} className='relative flex items-center mt-8 h-2'>
				<div id='size-min' style={{ left: ((minMaxInput.min - 1) / files.length) * 99 + '%' }} className={'z-10 absolute bg-blue-500 hover:z-20 transition-colors hover:bg-blue-400 rounded-full h-[200%] aspect-square ' + (activeRangeValue == 'min' ? '!bg-blue-400' : '')}></div>
				<div id='size-max' style={{ left: ((minMaxInput.max - 1) / files.length) * 99 + '%' }} className={'z-10 absolute bg-blue-500 hover:z-20 transition-colors hover:bg-blue-400 rounded-full h-[200%] aspect-square ' + (activeRangeValue == 'max' ? '!bg-blue-400' : '')}></div>
				<div className='relative flex items-center bg-neutral-500 rounded-full w-full h-2/3'>
					<div style={{ left: ((minMaxInput.min - 1) / files.length) * 99 + '%', width: ((minMaxInput.max - minMaxInput.min) / files.length) * 99 + '%' }} className='absolute bg-blue-500 h-full translate-x-2'></div>
				</div>
			</div> */}
		</div>
	);
}

export default RangeInput;
