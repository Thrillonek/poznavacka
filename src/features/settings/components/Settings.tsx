import { Icon } from '@iconify/react';
import { Checkbox } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useModeStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import '../assets/_Settings.scss';
import { useSettingsStatusStore } from '../data/stores';
import { handlePointerMove } from '../utils';
import ConfirmModal from './ConfirmModal';
import ExtraSettings from './ExtraSettings';
import KeybindControl from './KeybindControl';
import MinMaxControl from './MinMaxControl';
import PresetMenu from './PresetMenu';

export default function Settings() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { settings, updateQuizSettings, updateListSettings, setKeybind } = useSettingsStore((store) => store);
	const activeRangeValue = useSettingsStatusStore((store) => store.activeRangeValue);
	const deactivateRange = useSettingsStatusStore((store) => store.deactivateRange);
	const keybindToBeChanged = useSettingsStatusStore((store) => store.keybindToBeChanged);
	const stopChangingKeybinds = useSettingsStatusStore((store) => store.stopChangingKeybinds);
	const openModal = useSettingsStatusStore((store) => store.openModal);
	const mode = useModeStore((store) => store.mode);
	const setMode = useModeStore((store) => store.setMode);

	const { random } = settings.quiz;

	function handleKeyDown(e: KeyboardEvent) {
		if (!keybindToBeChanged) return;
		if (mode !== 'settings') return;

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
		<div onClick={() => setMode('quiz')} data-visible={mode == 'settings'} className='settings-modal'>
			<div onClick={(e) => e.stopPropagation()} className='settings-container'>
				<div className='settings-categories'></div>
				<div className='settings-content'>
					<ConfirmModal />

					<h1 className='mb-8 font-bold text-3xl'>Nastavení</h1>

					<div className='gap-x-8 gap-y-12 grid lg:grid-cols-2'>
						<div className='flex flex-col gap-4'>
							<h2 className='text-2xl'>Kvíz</h2>
							<div className='flex flex-col w-full'>
								<h2 className='mt-4 mb-1 text-neutral-300 text-lg'>Způsob generace obrázků</h2>
								<div className='relative gap-px grid grid-cols-2 bg-blue-500 rounded-xl [&>button]:w-full'>
									<button onClick={() => updateQuizSettings('random', true)} className={'z-10 text-neutral-400 py-2 outline-none border border-neutral-500 bg-neutral-700 border-r-0 rounded-l-lg ' + (random && '!text-blue-300 !border-blue-500 faint-bg')}>
										Náhodně
									</button>
									<button onClick={() => updateQuizSettings('random', false)} className={'z-10 text-neutral-400 py-2 outline-none border border-neutral-500 bg-neutral-700 border-l-0 rounded-r-lg ' + (!random && '!text-blue-300 !border-blue-500 faint-bg')}>
										Postupně
									</button>
								</div>
							</div>
							{poznavacka && (
								<div className='flex flex-col'>
									<MinMaxControl />
									<PresetMenu />
								</div>
							)}

							<KeybindControl />
							<ExtraSettings />

							<div className='flex mt-4 pt-4 border-neutral-600 border-t'>
								<button className='btn-danger' onClick={openModal}>
									Odstranit všechno naučené
								</button>
							</div>
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
				<button onClick={() => setMode('quiz')} className='settings-close'>
					<Icon icon='mdi:close' />
				</button>
			</div>
		</div>
	);
}
