import { useEffect, useRef, useState } from 'react';
import { fileSystem, insectGroupNames, plantGroupNames, usePoznavackaStore, useSettingsStore, useSwipeLockStore } from 'src/data';
import { isObject, nameFromPath, objFirstKey, objFirstValue } from 'src/utils';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import { useSmoothSwipeDown } from '../hooks/useSmoothSwipeDown';
import { getFiles } from '../utils/getFiles';
import { checkIsSearched } from '../utils/searchItem';
import EnlargedImage from './EnlargedImage';
import ListItem from './ListItem';
import SearchForm from './SearchForm';

export default function List() {
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);

	const searchInput = useListSearchStore((store) => store.searchInput);

	const files = getFiles();

	const [category, setCategory] = useState();
	const [scrollY, setScrollY] = useState();

	// RESETS STATE WHEN POZNAVACKA CHANGES
	useEffect(() => {
		document.getElementById('list').scrollTop = 0;
		setChosenFile(null);
	}, [poznavacka]);

	// UPDATES CATEGORY ON ENLARGED IMAGE
	// useEffect(() => {
	// 	if (chosenFile) {
	// 		let newCategory;
	// 		for (const [key, val] of Object.entries(plantGroupNames)) {
	// 			if (files.indexOf(chosenFile) >= key - 1) {
	// 				newCategory = val;
	// 			} else break;
	// 		}
	// 		setCategory(newCategory);
	// 	}
	// }, [chosenFile]);

	function handleScroll(e) {
		setScrollY(e.target.scrollTop);
	}

	return (
		<div className='relative flex flex-col h-full overflow-hidden'>
			<EnlargedImage />
			<SearchForm />

			{/* List */}
			<div id='list' onScroll={handleScroll} className='relative bg-neutral-900 h-full overflow-y-scroll'>
				<div className='gap-2 grid p-2'>
					{files
						.filter((f) => !isObject(f))
						.map((file, idx) => {
							if (settings.list?.hideComplete && settings.quiz.complete.includes(idx)) return null;
							let props = { idx, file };
							return <ListItem key={'list-item-' + objFirstKey(poznavacka) + idx} {...props} />;
						})}
				</div>
			</div>

			{/* Scroll Up Button */}
			<button style={{ opacity: scrollY > 100 && '100' }} onClick={(e) => scrollY > 100 && document.getElementById('list').scrollTo({ top: 0, behavior: 'smooth' })} className='right-2 md:right-8 bottom-2 z-30 absolute bg-neutral-900 opacity-0 border border-neutral-700 rounded-full outline-none h-12 aspect-square transition-opacity duration-300'>
				<i className='text-neutral-500 text-2xl fa-angles-up fa-solid'></i>
			</button>
		</div>
	);
}
