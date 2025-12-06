import { useSettingsStore } from 'src/data';
import KeybindInput from '../ui/KeybindInput';

function KeybindsSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const setKeybind = useSettingsStore((store) => store.setKeybind);

	return (
		<>
			<KeybindInput title='Změnit obrázek' keybindName='change' keybinds={settings.keybinds} setKeybind={setKeybind} />
			<KeybindInput title='Odhalit jméno' keybindName='reveal' keybinds={settings.keybinds} setKeybind={setKeybind} />
			<KeybindInput title='Označit obrázek jako naučený' keybindName='complete' keybinds={settings.keybinds} setKeybind={setKeybind} />
		</>
	);
}

export default KeybindsSettings;
