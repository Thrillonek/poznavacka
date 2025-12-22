import DeleteButton from 'src/components/form/DeleteButton';
import SwitchInput from 'src/components/form/SwitchInput';
import { useCompletedFilesStore, useInformationStore, useSettingsStore } from 'src/data';

function GeneralSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);
	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);
	const setInformation = useInformationStore((store) => store.setInformation);

	function confirmClearCompletedFiles() {
		clearCompletedFiles();
		setInformation('Naučené obrazky byly úspěšně resetovány.');
	}

	return (
		<>
			<SwitchInput title='Odstranit duplikované obrázky' description='Zajistí, že každý název bude v poznávačce jen jednou' active={settings.general.removeDuplicates} onToggle={() => updateSettings('general', 'removeDuplicates', !settings.general.removeDuplicates)} />
			<SwitchInput title='Automaticky přepínat kategorie nastavení' description='Zvolením módu aplikace (kvíz, seznam) se otevře i příslušná kategorie v nastavení' active={settings.general.autoSwitchSettingsMode} onToggle={() => updateSettings('general', 'autoSwitchSettingsMode', !settings.general.autoSwitchSettingsMode)} />
			<DeleteButton title='Resetovat naučené obrázky' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFiles()} />
		</>
	);
}

export default GeneralSettings;
