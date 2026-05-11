import DeleteButton from 'src/components/form/DeleteButton';
import { useCompletedFilesStore, useInformationStore } from 'src/data';
import { isFileInCurrentFolder } from 'src/utils/isFileInCurrentFolder';

function OtherSettings() {
	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);
	const setInformation = useInformationStore((store) => store.setInformation);

	function confirmClearCompletedFiles() {
		clearCompletedFiles();
		setInformation('Naučené obrazky byly úspěšně resetovány.');
	}

	function confirmClearCompletedFilesInCurrentFolder() {
		clearCompletedFiles((x) => !isFileInCurrentFolder(x));
		setInformation('Naučené obrazky v této složce byly úspěšně resetovány.');
	}

	return (
		<>
			<div className='settings-section'>
				<h3>Resetovat naučené obrázky</h3>
				<DeleteButton title='Resetovat všechno' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFiles()} />
				<DeleteButton title='Resetovat tuto složku' text='Tímto u všech obrázků v poznávačkách v této složce vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' confirmText='Resetovat' onConfirm={() => confirmClearCompletedFilesInCurrentFolder()} />
			</div>
		</>
	);
}

export default OtherSettings;
