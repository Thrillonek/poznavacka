import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import DeleteButton from '../ui/DeleteButton';
import SwitchInput from '../ui/SwitchInput';

function GeneralSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateCoreSettings = useSettingsStore((store) => store.updateCoreSettings);
	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);

	return (
		<>
			<SwitchInput title='Odstranit duplikované obrázky' description='Zajistí, že každý název bude v poznávačce jen jednou' active={settings.removeDuplicates} onToggle={() => updateCoreSettings('removeDuplicates', !settings.removeDuplicates)} />
			<SwitchInput title='Automaticky přepínat kategorie nastavení' description='Zvolením módu aplikace (kvíz, seznam) se otevře i příslušná kategorie v nastavení' active={settings.autoSwitchSettingsMode} onToggle={() => updateCoreSettings('autoSwitchSettingsMode', !settings.autoSwitchSettingsMode)} />
			<DeleteButton title='Resetovat naučené obrázky' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => clearCompletedFiles()} />
		</>
	);
}

export default GeneralSettings;
