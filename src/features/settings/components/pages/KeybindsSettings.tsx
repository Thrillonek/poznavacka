import { useSettingsStore } from 'src/data';
import { restoreDefaultKeybinds } from '../../utils';
import DeleteButton from '../ui/DeleteButton';
import KeybindInput from '../ui/KeybindInput';

function KeybindsSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const setKeybind = useSettingsStore((store) => store.setKeybind);

	return (
		<>
			<div className='settings-section'>
				<h3>Kvíz</h3>
				<KeybindInput title='Změnit obrázek' keybindName='change' keybinds={settings.keybinds} setKeybind={setKeybind} />
				<KeybindInput title='Odhalit jméno' keybindName='reveal' keybinds={settings.keybinds} setKeybind={setKeybind} />
				<KeybindInput title='Označit obrázek jako naučený' keybindName='complete' keybinds={settings.keybinds} setKeybind={setKeybind} />
			</div>
			<div className='bg-[--border] w-full h-px' />
			<DeleteButton title='Obnovit původní klávesové zkratky' text='Všechny vaše úpravy se tímto vymažou' confirmText='Obnovit' onConfirm={() => restoreDefaultKeybinds()} />
		</>
	);
}

export default KeybindsSettings;
