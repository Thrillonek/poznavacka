import { useEffect, useRef, useState } from 'react';
import { fileSystem, insectGroupNames, plantGroupNames, usePoznavackaStore, useSettingsStore, useSwipeLockStore } from 'src/data';
import { isObject, nameFromPath, objFirstValue } from 'src/utils';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import { useSmoothSwipeDown } from '../hooks/useSmoothSwipeDown';
import { getFiles } from '../utils/getFiles';
import { checkIsSearched } from '../utils/searchItem';
import EnlargedImage from './EnlargedImage';
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
	useEffect(() => {
		if (chosenFile) {
			let newCategory;
			for (const [key, val] of Object.entries(plantGroupNames)) {
				if (files.indexOf(chosenFile) >= key - 1) {
					newCategory = val;
				} else break;
			}
			setCategory(newCategory);
		}
	}, [chosenFile]);

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
							let isSearched = checkIsSearched(file) || searchInput == idx + 1;
							if (settings.list?.hideComplete && settings.quiz.complete.includes(idx)) return null;
							return (
								<div id={'list-item-' + (parseInt(idx) + 1)} key={idx}>
									<div onClick={(e) => setChosenFile(file)} className={'relative flex rounded-lg h-20 overflow-hidden cursor-pointer ' + (settings.quiz.complete.includes(idx + 1) ? 'bg-[hsl(100,25%,15%)]' : 'bg-neutral-800')}>
										<img key={Object.keys(poznavacka)[0] + idx} src={file.replace(' ', '%20').replace('+', '%2b')} alt={`${Object.keys(poznavacka)[0]} - obrázek ${idx + 1}`} className='object-cover aspect-square' />
										<div className='relative flex flex-grow items-center'>
											<span className={'ml-5 text-neutral-400 z-20 text-xl ' + (isSearched && '!text-neutral-300 font-semibold')}>{nameFromPath(file)}</span>
											<div className={'top-0 right-2 z-10 absolute font-black text-xl ' + (settings.quiz.complete.includes(idx + 1) ? 'text-lime-600' : 'text-neutral-600')}>{idx + 1}</div>
										</div>
									</div>
								</div>
							);
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
