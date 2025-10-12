import { fileSystem, insectGroupNames, plantGroupNames, usePoznavackaStore, useSettingsStore, useSwipeLockStore } from '@/data';
import { useAddEvent } from '@/hooks';
import { getGroupName, isObject, nameFromPath, objFirstValue } from '@/utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import { useSmoothSwipeDown } from '../hooks/useSmoothSwipeDown';
import { changeChosenFile } from '../utils/changeChosenFile';
import { getFiles } from '../utils/getFiles';
import { scrollToItem } from '../utils/scrollToItem';

export default function List() {
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const unlockSwiping = useSwipeLockStore((store) => store.unlockSwiping);
	const lockSwiping = useSwipeLockStore((store) => store.lockSwiping);

	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const isChosenFileSet = useChosenFileStore((store) => store.isSet);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);

	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);

	const files = getFiles();

	const [category, setCategory] = useState();
	const [showCategories, setShowCategories] = useState();
	const [browseCategories, setBrowseCategories] = useState();
	const [scrollY, setScrollY] = useState();
	const [searchVisible, setSearchVisible] = useState(false);

	useAddEvent('keydown', handleKeyDown);
	function handleKeyDown(e) {
		if (e.key == 'ArrowRight') {
			changeChosenFile({ right: true });
		} else if (e.key == 'ArrowLeft') {
			changeChosenFile({ left: true });
		}
	}

	useAddEvent('custom:swipe', handleSwipe, [isChosenFileSet]);
	function handleSwipe(e) {
		let direction = e.detail.direction;
		if (direction == 'left') changeChosenFile({ right: true });
		if (direction == 'right') changeChosenFile({ left: true });
		if (direction == 'down') setChosenFile(null);
	}

	// LOCKS MODE CHANGES WHEN IMAGE IS ENLARGED
	useEffect(() => {
		if (isChosenFileSet) {
			lockSwiping();
		} else {
			unlockSwiping();
		}
	}, [isChosenFileSet]);

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

	function toggleSearch(e) {
		e.preventDefault();
		document.getElementById('list-search').classList.toggle('!w-full');
		document.getElementById('list-search').classList.toggle('border');
		setSearchVisible(!searchVisible);
	}

	return (
		<div className='relative flex flex-col h-full overflow-hidden'>
			{/* Enlarged image carousel */}
			<div id='enlarged-img' className={'translate-y-full left-0 z-40 absolute flex gap-4 transition-transform justify-center items-center bg-neutral-800 w-full h-full ' + (chosenFile && '!translate-y-0')}>
				{/* {Object.keys(poznavacka)[0] == 'rostliny' && <div className='shadow-[0_0_20px_0_rgb(0,0,0,0.5)] mb-8 px-8 py-2 rounded-2xl font-bold text-[--text-main] text-4xl'>{category}</div>} */}

				{!window.matchMedia('(pointer: coarse)').matches && (
					<div onClick={(e) => changeChosenFile({ left: true })} className='text-neutral-400 cursor-pointer'>
						<i className='fa-angle-left text-5xl fa-solid'></i>
					</div>
				)}
				<div className='flex flex-col w-[70%] max-sm:w-[90%] h-[60%] overflow-hidden'>
					<span className='mx-auto mb-8 font-bold text-neutral-300 text-3xl'>{files.indexOf(chosenFile) + 1}</span>
					<div id='enlarged-img-slider' className={'relative transition-[left] grid grid-flow-col flex-grow ' /*(chosenFile ? '' : '')*/} style={{ left: `-${files.indexOf(chosenFile) * 100}%` }}>
						{files
							.filter((f) => !isObject(f))
							.map((file, idx) => {
								return (
									<div key={idx} className='top-0 absolute flex justify-center w-full h-full' style={{ left: `${files.indexOf(file) * 100}%` }}>
										<div className='rounded-lg overflow-hidden'>
											<img src={file.replace(' ', '%20').replace('+', '%2b')} className='w-full h-full object-contain overflow-hidden' alt='Obrázek' />
										</div>
									</div>
								);
							})}
					</div>
					<span className='mt-5 font-bold text-neutral-400 text-3xl text-center'>
						{chosenFile && nameFromPath(chosenFile)}
						{Object.keys(poznavacka)[0] == 'hmyz' && (
							<>
								<br />
								<p className='font-normal text-lg'>Řád: {getGroupName(files.indexOf(chosenFile), insectGroupNames)}</p>
							</>
						)}
					</span>

					{/* {files
						.filter((f) => !isObject(f))
						.map((file, idx) => {
							return (
								<>
									<span className='mt-5 font-bold text-neutral-400 text-3xl text-center'>
										{idx + 1}. {nameFromPath(file)}
									</span>
									{Object.keys(poznavacka)[0] == 'hmyz' && (
										<>
											<br />
											<p className='font-normal text-lg'>Řád: {calculateOrderName(idx, orderNames)}</p>
										</>
									)}
								</>
							);
						})} */}
				</div>
				{!window.matchMedia('(pointer: coarse)').matches && (
					<div onClick={(e) => changeChosenFile({ right: '+' })} className='text-neutral-400 cursor-pointer'>
						<i className='fa-angle-right text-5xl fa-solid'></i>
					</div>
				)}
				<button onClick={(e) => setChosenFile(null)} className={'top-3 left-24 absolute text-neutral-400 ' + (window.matchMedia('(pointer:coarse)').matches && '!left-[5%]')}>
					<i className='fa-arrow-left text-2xl fa-solid'></i>
				</button>
			</div>
			{/* Search/controls bar */}
			<div className='top-4 right-4 z-40 absolute max-w-[calc(100%-2rem)] overflow-hidden'>
				<form tabIndex={0} onKeyDown={(e) => e.key == 'Enter' && scrollToItem(e)} className='relative flex justify-end items-center gap-2'>
					<div id='list-search' className='z-20 relative flex items-center bg-neutral-700 border-neutral-600 rounded-full w-0 min-w-0 h-10 overflow-hidden transition-[width] duration-300'>
						<input placeholder={'Hledat ' + (browseCategories ? 'oddělení' : 'název/číslo')} onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='flex-grow bg-inherit ml-4 outline-none w-full h-full placeholder:font-normal font-semibold text-neutral-400 placeholder:text-neutral-500 caret-neutral-400' />
						<i onClick={(e) => setSearchInput('')} className={'text-lg ml-2 mr-4 text-neutral-500 cursor-pointer fa-solid fa-xmark ' + (!searchInput && 'pointer-events-none opacity-0')} />
					</div>
					<button onClick={toggleSearch} className='bg-neutral-600 rounded-full outline-none min-w-10 aspect-square text-neutral-400'>
						{searchVisible ? <i className='fa-solid fa-xmark' /> : <i className='fa-magnifying-glass fa-solid' />}
					</button>
				</form>
				{/* {poznavacka == 'rostliny' && (
					<div className='flex justify-between items-center p-1 cursor-pointer'>
						<div className='flex items-center w-1/2' onClick={(e) => setShowCategories((prev) => (prev ? false : true))}>
							<div className={'border-[--bg-secondary] border rounded w-4 h-4 flex justify-center items-center ' + (showCategories && 'bg-[--bg-secondary]')}>{showCategories && <i className='text-[--text-bright] text-xs fa-check fa-solid'></i>}</div>
							<p className='ml-2 text-[--bg-secondary]'>Ukázat oddělení</p>
						</div>
						{showCategories && (
							<div className='flex items-center w-1/2' onClick={(e) => setBrowseCategories((prev) => (prev ? false : true))}>
								<div className={'border-[--bg-secondary] border rounded w-4 h-4 flex justify-center items-center ' + (browseCategories && 'bg-[--bg-secondary]')}>{browseCategories && <i className='text-[--text-bright] text-xs fa-check fa-solid'></i>}</div>
								<p className='ml-2 text-[--bg-secondary]'>Hledat v odděleních</p>
							</div>
						)}
					</div>
				)} */}
			</div>
			{/* List */}
			<div id='list' onScroll={handleScroll} className='relative bg-neutral-900 h-full overflow-y-scroll'>
				<div className='gap-2 grid p-2'>
					{files
						.filter((f) => !isObject(f))
						.map((file, idx) => {
							let isSearched =
								searchInput &&
								!browseCategories &&
								nameFromPath(file)
									.split(' ')
									.some((f) => f.toLowerCase().startsWith(searchInput.toLowerCase()));

							if (settings.list?.hideComplete && settings.quiz.complete.includes(idx)) return null;
							return (
								<div id={'list-item-' + (parseInt(idx) + 1)} key={idx}>
									{/* {categories[idx + 1] && showCategories && (
									<div id={'cat-' + categories[idx + 1]} className='py-1 pl-3 font-semibold text-[--bg-secondary]'>
										{categories[idx + 1]}
									</div>
								)} */}
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
