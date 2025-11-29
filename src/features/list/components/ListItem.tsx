import { useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getFolderName, nameFromPath } from 'src/utils';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import type { ListItemProps } from '../types/base';
import { checkIsSearched } from '../utils/searchItem';

function ListItem({ idx, file }: ListItemProps) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	let isSearched = useMemo(() => checkIsSearched(file) || searchInput == (idx + 1).toString(), [searchInput]);

	return (
		<div id={'list-item-' + (idx + 1).toString()}>
			<div onClick={() => setChosenFile(file)} className={'relative flex rounded-lg h-20 overflow-hidden cursor-pointer ' + (completedFiles.includes(file) ? 'bg-[hsl(100,25%,15%)]' : 'bg-neutral-800')}>
				<img key={getFolderName(poznavacka!) + idx} src={file.replace(' ', '%20').replace('+', '%2b')} alt={`${getFolderName(poznavacka!)} - obrázek ${idx + 1}`} className='object-cover aspect-square' />
				<div className='relative flex flex-grow items-center'>
					<span className={'ml-5 text-neutral-400 z-20 text-xl ' + (isSearched && '!text-neutral-300 font-semibold')}>{nameFromPath(file)}</span>
					<div className={'top-0 right-2 z-10 absolute font-black text-xl ' + (completedFiles.includes(file) ? 'text-lime-600' : 'text-neutral-600')}>{idx + 1}</div>
				</div>
			</div>
		</div>
	);
}

export default ListItem;
