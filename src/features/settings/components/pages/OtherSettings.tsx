import SwitchInput from 'src/components/form/SwitchInput';
import { useSettingsStore } from 'src/data';

function OtherSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	return (
		<>
			<div className='settings-section'>
				<SwitchInput title='Odstranit duplikované obrázky' description='Zajistí, že každý název bude v poznávačce jen jednou' active={settings.general.removeDuplicates} onToggle={() => updateSettings('general', 'removeDuplicates', !settings.general.removeDuplicates)} />
				<SwitchInput title='Automaticky přepínat kategorie nastavení' description='Zvolením módu aplikace (kvíz, seznam) se otevře i příslušná kategorie v nastavení' active={settings.general.autoSwitchSettingsMode} onToggle={() => updateSettings('general', 'autoSwitchSettingsMode', !settings.general.autoSwitchSettingsMode)} />
			</div>
		</>
	);
}

export default OtherSettings;
