import SelectionInput from 'src/components/form/SelectionInput';
import { useSettingsStore } from 'src/data';
import { themes } from 'src/data/themes';

function ColorPickerSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	return (
		<>
			<div className='settings-section'>
				<h3>Motivy</h3>
				{Object.keys(themes).map((key) => {
					const typeSafeKey = key as keyof typeof themes;
					return <SelectionInput title={themes[typeSafeKey].title} active={settings.colorPicker.preset === typeSafeKey} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', typeSafeKey)} />;
				})}
			</div>
		</>
	);
}

export default ColorPickerSettings;
