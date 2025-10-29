import { Icon } from '@iconify/react';
import { useSettingsStore } from 'src/data';
import { useSettingsStatusStore } from '../data/stores';
import { restoreDefaultKeybinds } from '../utils';

function KeybindControl() {
	const keybindToBeChanged = useSettingsStatusStore((store) => store.keybindToBeChanged);
	const stopChangingKeybinds = useSettingsStatusStore((store) => store.stopChangingKeybinds);
	const startChangingKeybinds = useSettingsStatusStore((store) => store.startChangingKeybinds);

	const settings = useSettingsStore((store) => store.settings);

	return (
		<div className='phone-invisible flex flex-col'>
			<h2 className='mb-1 text-neutral-300 text-lg'>Klávesové zkratky</h2>
			<div className='gap-y-px grid bg-neutral-700 [&>*]:px-4 [&>*]:py-2 border border-neutral-700 rounded overflow-hidden text-neutral-400'>
				{[
					['Změnit obrázek', 'change'],
					['Odhalit jméno', 'reveal'],
					['Obrázek naučený', 'complete'],
				].map((item, index) => {
					return (
						<div key={'keybind-' + index} className='flex justify-between items-center gap-2 bg-neutral-800'>
							<p className='font-bold'>{item[0]}</p>
							<button className={'keybind-btn ' + (keybindToBeChanged == item[1] ? 'active' : '')} onClick={() => keybindToBeChanged != item[1] && startChangingKeybinds(item[1])}>
								{keybindToBeChanged == item[1] ? (
									<div className='flex items-center gap-1'>
										<p>Změnit...</p>
										<Icon onClick={() => stopChangingKeybinds()} icon='material-symbols:close' className='text-neutral-300 text-xl cursor-pointer'></Icon>
									</div>
								) : settings.keybinds[item[1]].length == 1 ? (
									settings.keybinds[item[1]].toUpperCase()
								) : (
									settings.keybinds[item[1]]
								)}
							</button>
						</div>
					);
				})}
			</div>
			<button onClick={restoreDefaultKeybinds} className='hover:bg-neutral-700 hover:bg-opacity-50 mt-2 mr-auto px-4 py-2 border-2 border-neutral-600 rounded text-neutral-300'>
				Obnovit původní klávesové zkratky
			</button>
		</div>
	);
}

export default KeybindControl;
