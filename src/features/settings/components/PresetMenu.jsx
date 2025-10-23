import { Icon } from '@iconify/react';
import { usePresetStore } from 'src/data';
import { usePresetMenuStore } from '../data/stores';
import { useDefineDefaultValues } from '../hooks/useDefineDefaultValues';
import { checkAllPresets } from '../utils';

function PresetMenu() {
	const { isPresetMenuOpen, togglePresetMenu } = usePresetMenuStore((store) => store);
	const presets = usePresetStore((store) => store.presets);
	const togglePreset = usePresetStore((store) => store.togglePreset);
	const presetLength = useDefineDefaultValues();

	return (
		<div className='flex flex-col bg-neutral-700 mt-8 rounded-xl w-full overflow-hidden'>
			<button className={'flex justify-center outline-none items-center gap-1 col-span-3 py-2 ' + (isPresetMenuOpen && 'bg-neutral-800 bg-opacity-[33%]')} onClick={togglePresetMenu}>
				<span>Předvolby</span>
				<Icon icon='mi:chevron-up' className={'text-xl transition-all ' + (!isPresetMenuOpen && 'rotate-180')}></Icon>
			</button>
			<div className={'grid transition-all  ' + (isPresetMenuOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
				<div className='grid grid-cols-3 auto-rows-fr min-h-0 overflow-hidden text-neutral-300'>
					{presetLength.current?.map((num) => {
						let isChecked = presets?.includes(num);
						return (
							<button key={num} onClick={() => togglePreset(num)} className={'flex outline-none items-center bg-white bg-opacity-0 hover:bg-opacity-5 transition-colors w-full py-[0.6rem] ' + (isChecked && '!bg-opacity-10')}>
								<p className={'font-bold w-full text-center'}>
									{num != 1 && num - 1}1 - {num}0
								</p>
							</button>
						);
					})}

					<div className='flex flex-col items-center col-span-3'>
						{/* <div className='bg-neutral-600 mx-auto w-[90%] h-px'></div> */}
						<button onClick={checkAllPresets} className='flex-grow bg-neutral-600 bg-opacity-50 hover:bg-opacity-100 w-full font-medium transition-colors'>
							Zaškrtnout všechno
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PresetMenu;
