import { useSearchParams } from 'next/navigation';
import type { UIEvent } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useMenuElementStore, usePoznavackaStore } from 'src/data';
import { getFolderName } from 'src/utils';
import '../assets/_List.scss';
import { useHiddenNameStore, useListFilesStore, useSelectedFileStore } from '../data/stores';
import { useToggleMenuVisibility } from '../hooks/useToggleMenuVisibility';
import { useUpdateFiles } from '../hooks/useUpdateFiles';
import ListItem from './ListItem';
import SearchForm from './SearchForm';
import SelectedFile from './SelectedFile';

export default function List(props: any) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setSelectedFile = useSelectedFileStore((store) => store.setSelectedFile);
	const selectedFile = useSelectedFileStore((store) => store.selectedFile);
	const setElement = useMenuElementStore((store) => store.setElement);
	const listFiles = useListFilesStore((store) => store.files);

	const isHiddenFileNames = useHiddenNameStore((store) => store.isHidden);
	const toggleHiddenFileNames = useHiddenNameStore((store) => store.toggleHidden);

	const searchParams = useSearchParams();
	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	const [scrollY, setScrollY] = useState<number>();
	const [visibleItems, setVisibleItems] = useState<number[]>([]);

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
		setSelectedFile(undefined);
		setVisibleItems([]);
	}, [poznavacka]);

	// INTERSECTION OBSERVER VIRTUALISATION YAY
	const listRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					if (entry.isIntersecting) {
						setVisibleItems((prev) => [...prev, parseInt(entry.target.id.replace('list-item-', ''))]);
					} else {
						setVisibleItems((prev) => prev.filter((item) => item !== parseInt(entry.target.id.replace('list-item-', ''))));
					}
				},
				{ threshold: 1 },
			);
		});

		listRef.current?.children && Array.from(listRef.current.children).forEach((child) => observer.observe(child));

		return () => observer.disconnect();
	}, [listRef.current, listFiles]);

	const handleScroll = useCallback((e: UIEvent) => {
		setScrollY(e.currentTarget.scrollTop);
	}, []);

	const scrollToTop = useCallback(() => {
		if (scrollY! > 100) document.getElementById('list')!.scrollTo({ top: 0, behavior: 'smooth' });
	}, [scrollY]);

	// HIDES SEARCH FORM MENU WHEN IMAGE IS SELECTED
	useToggleMenuVisibility();

	return (
		<div style={props.style} className='list-layout-container'>
			{selectedFile && <SelectedFile />}

			{/* List */}

			<div ref={listRef} id='list' onScroll={handleScroll} className='list-container'>
				{Object.entries(listFiles).map(([idx, file]) => {
					let props = { idx: parseInt(idx), file };
					return (
						<div style={{ height: '3rem', flexShrink: 0, width: '100%' }} id={'list-item-' + (props.idx + 1).toString()} key={'list-item-' + getFolderName(poznavacka!) + idx}>
							{visibleItems.includes(props.idx + 1) && <ListItem {...props} />}
						</div>
					);
				})}
			</div>

			<div className='right-4 bottom-4 absolute flex flex-col gap-2'>
				{/* Show file names button */}
				<button data-visible={isHiddenFileNames} onClick={() => toggleHiddenFileNames(false)} className='go-up-button'>
					<svg className='text-neutral-500 text-3xl' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
						<path d='M0 0h24v24H0z' fill='none' />
						<path fill='currentColor' d='M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3m6 9.5l1.8-1.8c-.5-.4-1.1-.7-1.8-.7c-1.4 0-2.5 1.1-2.5 2.5S16.6 21 18 21c.8 0 1.5-.4 2-1h1.7c-.6 1.5-2 2.5-3.7 2.5c-2.2 0-4-1.8-4-4s1.8-4 4-4c1.1 0 2.1.4 2.8 1.2l1.2-1.2v4zm-5.9 1s-.1 0 0 0C7 19.5 2.7 16.4 1 12c1.7-4.4 6-7.5 11-7.5s9.3 3.1 11 7.5c-.2.4-.4.9-.6 1.3c-1.1-.8-2.4-1.3-3.9-1.3c-.5 0-1 .1-1.5.2V12c0-2.8-2.2-5-5-5s-5 2.2-5 5s2.2 5 5 5h.2c-.1.5-.2 1-.2 1.5c0 .3 0 .7.1 1' />
					</svg>
				</button>
				{/* Scroll Up Button */}
				<button data-visible={scrollY! > 100} onClick={scrollToTop} className='go-up-button'>
					<svg className='text-neutral-500 text-3xl' xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
						<path d='M0 0h24v24H0z' fill='none' />
						<path fill='currentColor' d='M7.41 18.41L6 17l6-6l6 6l-1.41 1.41L12 13.83zm0-6L6 11l6-6l6 6l-1.41 1.41L12 7.83z' />
					</svg>
				</button>
			</div>
		</div>
	);
}
