import DeleteButton from 'src/components/form/DeleteButton';
import SwitchInput from 'src/components/form/SwitchInput';
import { useCompletedFilesStore, useInformationStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useFileSystemStore } from 'src/features/file-system/data/stores';
import { getFolderName } from 'src/utils';

function GeneralSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);
	const setInformation = useInformationStore((store) => store.setInformation);

	const path = useFileSystemStore((store) => store.path);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	function confirmClearCompletedFiles() {
		clearCompletedFiles();
		setInformation('Naučené obrazky byly úspěšně resetovány.');
	}

	function confirmClearCompletedFilesInCurrentFolder() {
		clearCompletedFiles((x) => !x.includes(path.join('/') + '/' + getFolderName(poznavacka!)));
		setInformation('Naučené obrazky v této složce byly úspěšně resetovány.');
	}

	return (
		<>
			<div className='settings-section'>
				<SwitchInput title='Odstranit duplikované obrázky' description='Zajistí, že každý název bude v poznávačce jen jednou' active={settings.general.removeDuplicates} onToggle={() => updateSettings('general', 'removeDuplicates', !settings.general.removeDuplicates)} />
				<SwitchInput title='Automaticky přepínat kategorie nastavení' description='Zvolením módu aplikace (kvíz, seznam) se otevře i příslušná kategorie v nastavení' active={settings.general.autoSwitchSettingsMode} onToggle={() => updateSettings('general', 'autoSwitchSettingsMode', !settings.general.autoSwitchSettingsMode)} />
			</div>
			<div className='settings-section'>
				<h3>Resetovat naučené obrázky</h3>
				<DeleteButton title='Resetovat všechno' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFiles()} />
				<DeleteButton title='Resetovat tuto složku' text='Tímto u všech obrázků v poznávačkách v této složce vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFilesInCurrentFolder()} />
			</div>
		</>
	);
}

export default GeneralSettings;
