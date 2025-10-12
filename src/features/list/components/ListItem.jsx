import { useMemo } from 'react';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { nameFromPath } from 'src/utils';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import { checkIsSearched } from '../utils/searchItem';

function ListItem({ idx, file }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);

	let isSearched = useMemo(() => checkIsSearched(file) || searchInput == idx + 1, [searchInput]);

	return (
		<div id={'list-item-' + (parseInt(idx) + 1)}>
			<div onClick={(e) => setChosenFile(file)} className={'relative flex rounded-lg h-20 overflow-hidden cursor-pointer ' + (settings.quiz.complete.includes(idx + 1) ? 'bg-[hsl(100,25%,15%)]' : 'bg-neutral-800')}>
				<img key={Object.keys(poznavacka)[0] + idx} src={file.replace(' ', '%20').replace('+', '%2b')} alt={`${Object.keys(poznavacka)[0]} - obrázek ${idx + 1}`} className='object-cover aspect-square' />
				<div className='relative flex flex-grow items-center'>
					<span className={'ml-5 text-neutral-400 z-20 text-xl ' + (isSearched && '!text-neutral-300 font-semibold')}>{nameFromPath(file)}</span>
					<div className={'top-0 right-2 z-10 absolute font-black text-xl ' + (settings.quiz.complete.includes(idx + 1) ? 'text-lime-600' : 'text-neutral-600')}>{idx + 1}</div>
				</div>
			</div>
		</div>
	);
}

export default ListItem;
