import { useEffect, useMemo, useRef, useState } from 'react';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getFolderName, nameFromPath } from 'src/utils';
import '../assets/_ListItem.scss';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import type { ListItemProps } from '../types/base';

function ListItem({ file, idx }: ListItemProps) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const searchedItem = useListSearchStore((store) => store.searchedItem);
	const chosenFile = useChosenFileStore((store) => store.chosenFile);

	const [isElementVisible, setElementVisible] = useState(false);

	const listItemRef = useRef<HTMLImageElement>();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					setElementVisible(entry.isIntersecting);
				},
				{ threshold: 1 },
			);
		});

		if (listItemRef.current) observer.observe(listItemRef.current);
		return () => observer.disconnect();
	}, [listItemRef.current]);

	const resizedFile = useMemo(() => (!window.location.href.includes('localhost') ? `https://wsrv.nl/?${encodeURI(file)}?w=50&h=50` : file), [file]);

	return (
		<div ref={listItemRef as any} id={'list-item-' + (idx + 1).toString()}>
			<div onClick={() => setChosenFile(file)} data-chosen={chosenFile === file} data-searched={searchedItem === file} data-completed={completedFiles.includes(file)} className='list-item-container'>
				<div className='flex items-center gap-4'>
					<div className='list-item-number'>
						<p data-length={(idx + 1).toString().length}>{idx + 1}</p>
					</div>
					<p className='list-item-text'>{nameFromPath(file)}</p>
				</div>
				<img loading='lazy' decoding='async' fetchPriority='low' key={getFolderName(poznavacka!) + idx} src={isElementVisible ? resizedFile : ''} alt={`${getFolderName(poznavacka!)} - obrázek ${idx + 1}`} />
			</div>
		</div>
	);
}

export default ListItem;
