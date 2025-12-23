import RangeInput from 'src/components/form/RangeInput';
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
			<div className='settings-section'>
				<h3>Vlastní motiv</h3>
				<SelectionInput title={'Vlastní'} active={settings.colorPicker.preset === 'custom'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'custom')} />
				<h4 className='pl-2 text-muted'>Sytost</h4>
				<RangeInput value={settings.colorPicker.chroma} size={100} setValue={(newValue) => updateSettings('colorPicker', 'chroma', newValue)} />
				<h4 className='pl-2 text-muted'>Odstín</h4>
				<RangeInput value={settings.colorPicker.hue} size={360} setValue={(newValue) => updateSettings('colorPicker', 'hue', newValue)} />
			</div>
		</>
	);
}

export default ColorPickerSettings;
