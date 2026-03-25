import type { UIEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useMenuElementStore, usePoznavackaStore } from 'src/data';
import { getFolderName } from 'src/utils';
import '../assets/_List.scss';
import { useChosenFileStore, useListFilesStore } from '../data/stores';
import { useLockSwiping } from '../hooks/useLockSwiping';
import { useUpdateFiles } from '../hooks/useUpdateFiles';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import SelectedFile from './SelectedFile';

export default function List(props: any) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setElement = useMenuElementStore((store) => store.setElement);
	const listFiles = useListFilesStore((store) => store.files);

	const [searchParams, _] = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	const [scrollY, setScrollY] = useState<number>();

	useUpdateFiles();

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

	function handleScroll(e: UIEvent) {
		setScrollY(e.currentTarget.scrollTop);
	}

	function scrollToTop() {
		if (scrollY! > 100) document.getElementById('list')!.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// LOCKS MODE CHANGES WHEN IMAGE IS ENLARGED
	useLockSwiping();

	return (
		<div style={props.style} className='list-layout-container'>
			{chosenFile && <SelectedFile />}

			{/* List */}

			<div id='list' onScroll={handleScroll} className='list-container'>
				{Object.entries(listFiles).map(([idx, file]) => {
					let props = { idx: parseInt(idx), file };
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
