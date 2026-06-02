import DeleteButton from 'src/components/form/DeleteButton';
import { useCompletedFilesStore, useInformationStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { isFileInCurrentFolder } from 'src/utils/isFileInCurrentFolder';

function OtherSettings() {
	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);
	const setInformation = useInformationStore((store) => store.setInformation);
	const settings = useSettingsStore((store) => store.settings);

	function confirmClearCompletedFiles() {
		clearCompletedFiles();
		setInformation('Naučené obrazky byly úspěšně resetovány.');
	}

	function confirmClearCompletedFilesInCurrentFolder() {
		clearCompletedFiles((x) => isFileInCurrentFolder(x));
		setInformation('Naučené obrazky v této složce byly úspěšně resetovány.');
	}

	function confirmClearCompletedFilesInCurrentSet() {
		const files = getFiles();
		clearCompletedFiles((x) => {
			const idx = files.indexOf(x) + 1;
			return settings.quiz.min <= idx && idx <= settings.quiz.max;
		});
		setInformation('Naučené obrazky ve zvoleném rozsahu byly úspěšně resetovány.');
	}

	return (
		<>
			<div className='settings-section'>
				<h3>Resetovat naučené obrázky</h3>
				<DeleteButton title='Resetovat všechno' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFiles()} />
				<DeleteButton title='Resetovat tuto složku' text='Tímto u všech obrázků v poznávačkách v této složce vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFilesInCurrentFolder()} />
				<DeleteButton title='Resetovat ve zvoleném rozsahu' text='Tímto u všech obrázků ve zvoleném rozsahu zkoušení vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFilesInCurrentSet()} />
			</div>
		</>
	);
}

export default OtherSettings;
