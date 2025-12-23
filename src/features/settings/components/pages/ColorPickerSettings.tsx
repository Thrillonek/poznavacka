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
				<SelectionInput title={'Zapnout'} active={settings.colorPicker.preset === 'custom'} type='radio' onSelect={() => updateSettings('colorPicker', 'preset', 'custom')} />
				{settings.colorPicker.preset === 'custom' && (
					<>
						<h4 className='pl-2 text-muted'>Sytost</h4>
						<RangeInput value={settings.colorPicker.chroma} size={100} setValue={(newValue) => updateSettings('colorPicker', 'chroma', newValue)} tooltipText={`${settings.colorPicker.chroma}%`} containerStyle={{ background: `linear-gradient(to right, oklch(0.22 0 0), oklch(0.5 .1 ${settings.colorPicker.hue}))` }} />
						<h4 className='pl-2 text-muted'>Odstín</h4>
						<RangeInput value={settings.colorPicker.hue} size={360} setValue={(newValue) => updateSettings('colorPicker', 'hue', newValue)} tooltipText={''} containerStyle={{ background: 'linear-gradient(90deg in oklch longer hue, oklch(0.35 0.075 0), oklch(0.35 0.075 0))' }} />
					</>
				)}
			</div>
		</>
	);
}

export default ColorPickerSettings;
