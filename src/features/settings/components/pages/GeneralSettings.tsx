import DeleteButton from 'src/components/form/DeleteButton';
import SwitchInput from 'src/components/form/SwitchInput';
import { useCompletedFilesStore, useInformationStore, useSettingsStore } from 'src/data';

function GeneralSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateCoreSettings = useSettingsStore((store) => store.updateCoreSettings);
	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);
	const setInformation = useInformationStore((store) => store.setInformation);

	function confirmClearCompletedFiles() {
		clearCompletedFiles();
		setInformation('Naučené obrazky byly úspěšně resetovány.');
	}

	return (
		<>
			<SwitchInput title='Odstranit duplikované obrázky' description='Zajistí, že každý název bude v poznávačce jen jednou' active={settings.removeDuplicates} onToggle={() => updateCoreSettings('removeDuplicates', !settings.removeDuplicates)} />
			<SwitchInput title='Automaticky přepínat kategorie nastavení' description='Zvolením módu aplikace (kvíz, seznam) se otevře i příslušná kategorie v nastavení' active={settings.autoSwitchSettingsMode} onToggle={() => updateCoreSettings('autoSwitchSettingsMode', !settings.autoSwitchSettingsMode)} />
			<DeleteButton title='Resetovat naučené obrázky' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFiles()} />
		</>
	);
}

export default GeneralSettings;
