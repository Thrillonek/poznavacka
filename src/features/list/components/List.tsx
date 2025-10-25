import type { UIEvent } from 'react';
import { useEffect, useState } from 'react';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles, isObject, objFirstKey } from 'src/utils';
import { useChosenFileStore } from '../data/stores';
import EnlargedImage from './EnlargedImage';
import ListItem from './ListItem';
import SearchForm from './SearchForm';

export default function List() {
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const files = getFiles();

	const [scrollY, setScrollY] = useState<number>();

	// RESETS STATE WHEN POZNAVACKA CHANGES
	useEffect(() => {
		document.getElementById('list')!.scrollTop = 0;
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

	function handleScroll(e: UIEvent) {
		setScrollY(e.currentTarget.scrollTop);
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
							if (settings.list.hideCompleted && completedFiles.includes(file)) return null;
							let props = { idx, file };
							return <ListItem key={'list-item-' + objFirstKey(poznavacka!) + idx} {...props} />;
						})}
				</div>
			</div>

			{/* Scroll Up Button */}
			<button style={{ opacity: scrollY! > 100 ? '100' : undefined }} onClick={() => scrollY! > 100 && document.getElementById('list')!.scrollTo({ top: 0, behavior: 'smooth' })} className='right-2 md:right-8 bottom-2 z-30 absolute bg-neutral-900 opacity-0 border border-neutral-700 rounded-full outline-none h-12 aspect-square transition-opacity duration-300'>
				<i className='text-neutral-500 text-2xl fa-angles-up fa-solid'></i>
			</button>
		</div>
	);
}
