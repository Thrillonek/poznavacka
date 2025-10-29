import { useMemo, useState } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils';
import { useSettingsStatusStore } from '../data/stores';
import { useUpdateRangeUI } from '../hooks/useUpdateRangeUI';
import { handleChangeMinMax } from '../utils';
import { handleFocusOut } from '../utils/handleFocusOut';

function MinMaxControl() {
	const activateRange = useSettingsStatusStore((store) => store.activateRange);
	const activeRangeValue = useSettingsStatusStore((store) => store.activeRangeValue);
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const { min, max } = settings.quiz;

	const [minMaxInput, setMinMaxInput] = useState<Record<string, number>>({ min, max });

	const files = useMemo(() => getFiles(), [poznavacka]);

	useUpdateRangeUI(files, setMinMaxInput);

	useAddEventListener('focusout', () => handleFocusOut(files), [min, max]);

	return (
		<>
			<h2 className='mb-1 text-neutral-300 text-lg'>Zkoušená sada</h2>
			<div className='flex gap-4 mx-auto'>
				<div className='gap-1 grid grid-cols-1 w-12'>
					<label className='font-bold text-neutral-300 text-sm text-center' htmlFor='min'>
						Od
					</label>
					<input id='min' className='bg-neutral-600 p-1 rounded outline-none font-medium text-neutral-300 text-center caret-neutral-400' type='text' onChange={(e) => handleChangeMinMax(e, 'min')} value={min} />
				</div>
				<div className='gap-1 grid grid-cols-1 w-12'>
					<label className='font-bold text-neutral-300 text-sm text-center' htmlFor='max'>
						Do
					</label>
					<input className='bg-neutral-600 p-1 rounded outline-none font-medium text-neutral-300 text-center caret-neutral-400' type='text' onChange={(e) => handleChangeMinMax(e, 'max')} value={max} />
				</div>
			</div>
			<div id='size-range' className='relative flex items-center mt-8 h-2'>
				<div id='size-min' onPointerDown={() => activateRange('min')} style={{ left: ((minMaxInput.min - 1) / files.length) * 99 + '%' }} className={'z-10 absolute bg-blue-500 hover:z-20 transition-colors hover:bg-blue-400 rounded-full h-[200%] aspect-square ' + (activeRangeValue == 'min' ? '!bg-blue-400' : '')}></div>
				<div id='size-max' onPointerDown={() => activateRange('max')} style={{ left: ((minMaxInput.max - 1) / files.length) * 99 + '%' }} className={'z-10 absolute bg-blue-500 hover:z-20 transition-colors hover:bg-blue-400 rounded-full h-[200%] aspect-square ' + (activeRangeValue == 'max' ? '!bg-blue-400' : '')}></div>
				<div className='relative flex items-center bg-neutral-500 rounded-full w-full h-2/3'>
					<div style={{ left: ((minMaxInput.min - 1) / files.length) * 99 + '%', width: ((minMaxInput.max - minMaxInput.min) / files.length) * 99 + '%' }} className='absolute bg-blue-500 h-full translate-x-2'></div>
				</div>
			</div>
		</>
	);
}

export default MinMaxControl;
