import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getFolderName, nameFromPath } from 'src/utils';
import '../assets/_ListItem.scss';
import { useChosenFileStore } from '../data/stores';
import type { ListItemProps } from '../types/base';

function ListItem({ file, idx, isVisible }: ListItemProps) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const chosenFile = useChosenFileStore((store) => store.chosenFile);

	const resizedFile = useMemo(() => (!window.location.href.includes('localhost') ? `https://wsrv.nl/?url=${window.location.host + encodeURI(file)}&w=64&h=64&output=webp` : file), [file]);

	return (
		<div onClick={() => setChosenFile(file)} data-chosen={isVisible && chosenFile === file} id={'list-item-' + (idx + 1).toString()} className='list-item-container'>
			{isVisible && (
				<>
					<div className='relative flex justify-start items-center gap-4'>
						<div className='list-item-number'>
							<p data-length={(idx + 1).toString().length}>{idx + 1}</p>
						</div>
						<p className='list-item-text'>{nameFromPath(file)}</p>
					</div>

					<div className='flex items-center gap-4 shrink-0'>
						{completedFiles.includes(file) && (
							<div className='text-lime-500'>
								<Icon className='text-2xl' icon='mdi:checkbox-marked-circle-outline' />
							</div>
						)}
						<img loading='lazy' decoding='async' fetchPriority='low' key={getFolderName(poznavacka!) + idx} src={resizedFile} alt={`${getFolderName(poznavacka!)} - obrázek ${idx + 1}`} />
					</div>
				</>
			)}
		</div>
	);
}

export default ListItem;
