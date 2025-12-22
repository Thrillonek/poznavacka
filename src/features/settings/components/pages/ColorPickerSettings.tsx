import SelectionInput from 'src/components/form/SelectionInput';
import { useSettingsStore } from 'src/data';

function ColorPickerSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	return (
		<>
			<div className='settings-section'>
				<h3>Motivy</h3>
				<SelectionInput title='Tmavý' active={settings.colorPicker.preset === 'dark'} type='radio' onSelect={() => updateSettings('list', 'showFiles', 'all')} />
				<SelectionInput title='Světlý' active={settings.colorPicker.preset === 'light'} type='radio' onSelect={() => updateSettings('list', 'showFiles', 'uncompleted')} />
			</div>
		</>
	);
}

export default ColorPickerSettings;
