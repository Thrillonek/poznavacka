import SelectionInput from 'src/components/form/SelectionInput';
import { useSettingsStore } from 'src/data';

function ColorPickerSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	return (
		<>
			<div className='settings-section'>
				<h3>Motivy</h3>
				<SelectionInput title='Tmavý' active={settings.colorPicker.preset === 'dark'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'dark')} />
				<SelectionInput title='Světlý' active={settings.colorPicker.preset === 'light'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'light')} />
				<SelectionInput title='Nedělej to' active={settings.colorPicker.preset === 'ULTRALIGHT'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'ULTRALIGHT')} />
			</div>
		</>
	);
}

export default ColorPickerSettings;
