import SelectionInput from 'src/components/form/SelectionInput';
import { useSettingsStore } from 'src/data';
import { useChangeTheme } from '../../hooks/useChangeTheme';

function ColorPickerSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	useChangeTheme(settings.colorPicker.preset);

	return (
		<>
			<div className='settings-section'>
				<h3>Motivy</h3>
				<SelectionInput title='Tmavý' active={settings.colorPicker.preset === 'dark'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'dark')} />
				<SelectionInput title='Světlý' active={settings.colorPicker.preset === 'light'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'light')} />
			</div>
		</>
	);
}

export default ColorPickerSettings;
