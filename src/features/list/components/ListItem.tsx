import { useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getFolderName, nameFromPath } from 'src/utils';
import '../assets/_ListItem.scss';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import type { ListItemProps } from '../types/base';
import { checkIsSearched } from '../utils/searchItem';

function ListItem({ idx, file, hideImage }: ListItemProps) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	//TODO: MAKE SEARCH RESULTS LIGHT UP ONLY WHEN SEARCH FORM SUBMITED

	let isSearched = useMemo(() => checkIsSearched(file), [searchInput]);

	return (
		<div id={'list-item-' + (idx + 1).toString()}>
			<div onClick={() => setChosenFile(file)} data-searched={isSearched} data-completed={completedFiles.includes(file)} className='list-item-container'>
				<div className='flex items-center gap-4'>
					<div className='list-item-number'>
						<p data-length={(idx + 1).toString().length}>{idx + 1}</p>
					</div>
					<p className='list-item-text'>{nameFromPath(file)}</p>
				</div>
				{hideImage != true && <img key={getFolderName(poznavacka!) + idx} src={file.replace(' ', '%20').replace('+', '%2b')} alt={`${getFolderName(poznavacka!)} - obrázek ${idx + 1}`} />}
			</div>
		</div>
	);
}

export default ListItem;
