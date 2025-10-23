import { Icon } from '@iconify/react';
import { Checkbox } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useState } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { useSettingsStatusStore } from '../data/stores';
import { handlePointerMove } from '../utils';
import KeybindControl from './KeybindControl';
import MinMaxControl from './MinMaxControl';
import PresetMenu from './PresetMenu';

export default function Settings() {
	const [modalVisible, setModalVisible] = useState();

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { settings, updateCoreSettings, updateQuizSettings, updateListSettings, setKeybind } = useSettingsStore((store) => store);
	const activeRangeValue = useSettingsStatusStore((store) => store.activeRangeValue);
	const deactivateRange = useSettingsStatusStore((store) => store.deactivateRange);
	const keybindToBeChanged = useSettingsStatusStore((store) => store.keybindToBeChanged);
	const stopChangingKeybinds = useSettingsStatusStore((store) => store.stopChangingKeybinds);

	const { random } = settings.quiz;

	function handleKeyDown(e) {
		if (!keybindToBeChanged) return;

		if (e.key == 'Escape') {
			return stopChangingKeybinds();
		}

		setKeybind(keybindToBeChanged, e.key);
		return stopChangingKeybinds();
	}

	useAddEventListener('pointerup', () => deactivateRange());
	useAddEventListener('pointermove', handlePointerMove, [activeRangeValue]);
	useAddEventListener('keydown', handleKeyDown, [keybindToBeChanged]);
	useAddEventListener('touchmove', (e) => activeRangeValue && e.preventDefault(), [activeRangeValue], { passive: false });

	return (
		<div className='relative bg-neutral-800 p-8 outline-none w-full h-full overflow-y-auto select-none'>
			<div onClick={() => setModalVisible(false)} className={'fixed w-screen z-50 top-0 left-0 transition-opacity backdrop-blur-sm h-screen bg-black bg-opacity-20 ' + (modalVisible ? '' : 'pointer-events-none opacity-0')}>
				<div onClick={(e) => e.stopPropagation()} className='modal'>
					<button onClick={() => setModalVisible(false)} className='top-2 right-2 absolute hover:bg-neutral-700 p-1 rounded-full'>
						<Icon icon='material-symbols:close' className='text-neutral-500 text-2xl'></Icon>
					</button>
					<p className='text-neutral-300 text-lg md:text-2xl text-center'>Vážně chceš odstranit všechny svoje vědomosti?</p>
					<div className='flex gap-x-4 mt-8'>
						<button
							className='btn-danger'
							onClick={() => {
								updateQuizSettings('complete', []);
								setModalVisible(false);
							}}
						>
							Ano
						</button>
						<button className='!bg-blue-500 hover:brightness-110 !border-blue-500 btn-danger' onClick={() => setModalVisible(false)}>
							Ne
						</button>
					</div>
				</div>
			</div>

			<h1 className='mb-8 font-bold text-3xl'>Nastavení</h1>

			<div className='gap-x-8 gap-y-12 grid lg:grid-cols-2'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-2xl'>Kvíz</h2>
					{/* <button className='top-2 right-3 absolute px-3 py-2' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 0)}>
					<i className='text-[--text-main] text-2xl fa-solid fa-xmark'></i>
					</button> */}
					<div className='flex flex-col w-full'>
						<h2 className='mt-4 mb-1 text-neutral-300 text-lg'>Způsob generace obrázků</h2>
						<div className='relative gap-px grid grid-cols-2 bg-blue-500 rounded-xl [&>button]:w-full'>
							{/* <div className={'top-0 left-0 z-0 absolute bg-blue-500 m-1 rounded w-[calc(50%-.5rem)] h-[calc(100%-.5rem)] transition-transform ' + (!random && 'translate-x-[calc(100%+.5rem)]')} /> */}
							<button onClick={(e) => updateQuizSettings('random', true)} className={'z-10 text-neutral-400 py-2 outline-none border border-neutral-500 bg-neutral-700 border-r-0 rounded-l-lg ' + (random && '!text-blue-300 !border-blue-500 faint-bg')}>
								Náhodně
							</button>
							<button onClick={(e) => updateQuizSettings('random', false)} className={'z-10 text-neutral-400 py-2 outline-none border border-neutral-500 bg-neutral-700 border-l-0 rounded-r-lg ' + (!random && '!text-blue-300 !border-blue-500 faint-bg')}>
								Postupně
							</button>
						</div>
						{/* <h2 className='mt-4 mb-1 text-neutral-300 text-lg'>Nastavení</h2>
						<div className='relative gap-px grid grid-cols-2 bg-blue-500 rounded-xl [&>button]:w-full'>
							<button onClick={(e) => setQuizSettings('mode', 'custom')} className={'z-10 text-neutral-400 py-2 border border-neutral-500 bg-neutral-700 border-r-0 rounded-l-lg ' + (mode == 'custom' && '!text-blue-300 !border-blue-500 bg-[hsl(220,33%,25%)] ')}>
								Vlastní
							</button>
							<button onClick={(e) => setQuizSettings('mode', 'preset')} className={'z-10 text-neutral-400 py-2 border border-neutral-500 bg-neutral-700 border-l-0 rounded-r-lg ' + (mode == 'preset' && '!text-blue-300 !border-blue-500 bg-[hsl(220,33%,25%)] ')}>
								Předvolby
							</button>
						</div> */}
					</div>
					{poznavacka && (
						<div className='flex flex-col'>
							<MinMaxControl />
							<PresetMenu />
						</div>
					)}

					<KeybindControl />

					<div className='mt-4 pt-4 border-neutral-600 border-t'>
						<div className='flex items-center'>
							<Checkbox
								sx={{
									color: blue[800],
									'&.Mui-checked': {
										color: blue[600],
									},
								}}
								onChange={(e) => updateCoreSettings('removeDuplicates', e.target.checked)}
							></Checkbox>
							<p className='font-semibold text-neutral-300'>Odstranit duplikované obrázky</p>
						</div>
						<div className='flex items-center'>
							<Checkbox
								sx={{
									color: blue[800],
									'&.Mui-checked': {
										color: blue[600],
									},
								}}
								onChange={(e) => updateCoreSettings('devMode', e.target.checked)}
							></Checkbox>
							<p className='font-semibold text-neutral-300'>Vývojařský režim (zobrazovat index obrázku)</p>
						</div>
					</div>
					<div className='flex mt-4 pt-4 border-neutral-600 border-t'>
						<button className='btn-danger' onClick={() => setModalVisible(true)}>
							Odstranit všechno naučené
						</button>
					</div>
					{/* <span className='phone-invisible mb-5 p-2 text-neutral-200 text-lg text-center'>
						<h2 className='font-semibold text-lg'>TIP:</h2>
						Stiskni klávesu <i className='px-1 text-xl fa-caret-square-up fa-solid' /> pro změnu rostliny
						<br />
						a klávesu <i className='px-1 text-xl fa-caret-square-down fa-solid' /> pro název rostliny
					</span> */}
				</div>
				<div>
					<h2 className='mb-6 text-2xl'>Seznam</h2>

					<div className='flex items-center'>
						<Checkbox
							sx={{
								color: blue[800],
								'&.Mui-checked': {
									color: blue[600],
								},
							}}
							onChange={(e) => updateListSettings('hideCompleted', e.target.checked)}
						></Checkbox>
						<p className='font-semibold text-neutral-300'>Skrýt obrázky, které jsou naučené</p>
					</div>
				</div>
			</div>
		</div>
	);
}
