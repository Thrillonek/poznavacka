import { useCompletedFilesStore, useModeStore, usePoznavackaStore } from 'src/data';
import { getFolderName, nameFromPath } from 'src/utils';
import '../assets/_ListItem.scss';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import type { ListItemProps } from '../types/base';

function ListItem({ idx, file }: ListItemProps) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const searchedItem = useListSearchStore((store) => store.searchedItem);
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const mode = useModeStore((store) => store.mode);

	return (
		<div id={'list-item-' + (idx + 1).toString()}>
			<div onClick={() => setChosenFile(file)} data-chosen={chosenFile === file} data-searched={searchedItem === file} data-completed={completedFiles.includes(file)} className='list-item-container'>
				<div className='flex items-center gap-4'>
					<div className='list-item-number'>
						<p data-length={(idx + 1).toString().length}>{idx + 1}</p>
					</div>
					<p className='list-item-text'>{nameFromPath(file)}</p>
				</div>
				<img key={getFolderName(poznavacka!) + idx} src={mode == 'list' ? file.replace(' ', '%20').replace('+', '%2b') : ''} alt={`${getFolderName(poznavacka!)} - obrázek ${idx + 1}`} />
			</div>
		</div>
	);
}

export default ListItem;
