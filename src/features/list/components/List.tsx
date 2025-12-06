import type { UIEvent } from 'react';
import { useEffect, useState } from 'react';
import { useCompletedFilesStore, useMenuElementStore, useModeStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles, getFolderName, isObject } from 'src/utils';
import '../assets/_List.scss';
import { useChosenFileStore } from '../data/stores';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import SelectedFile from './SelectedFile';

export default function List() {
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const setElement = useMenuElementStore((store) => store.setElement);
	const mode = useModeStore((store) => store.mode);

	const files = getFiles();

	const [scrollY, setScrollY] = useState<number>();

	useEffect(() => {
		if (mode == 'list') {
			setElement(SearchForm);
		}

		return () => setElement(null);
	}, [mode]);

	// RESETS STATE WHEN POZNAVACKA CHANGES
	useEffect(() => {
		document.getElementById('list')!.scrollTop = 0;
		setChosenFile(undefined);
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

	function scrollToTop() {
		if (scrollY! > 100) document.getElementById('list')!.scrollTo({ top: 0, behavior: 'smooth' });
	}

	return (
		<div className='list-layout-container'>
			<SelectedFile />

			{/* List */}
			<div id='list' onScroll={handleScroll} className='list-container'>
				{files
					.filter((f) => !isObject(f))
					.map((file, idx) => {
						if (settings.list.showFiles == 'uncompleted' && completedFiles.includes(file)) return null;
						if (settings.list.showFiles == 'completed' && !completedFiles.includes(file)) return null;
						let props = { idx, file };
						return <ListItem key={'list-item-' + getFolderName(poznavacka!) + idx} {...props} />;
					})}
			</div>

			{/* Scroll Up Button */}
			<button data-visible={scrollY! > 100} onClick={scrollToTop} className='go-up-button'>
				<i className='text-neutral-500 text-2xl fa-angles-up fa-solid'></i>
			</button>
		</div>
	);
}
