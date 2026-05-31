import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useMemo } from 'react';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getFolderName, nameFromPath } from 'src/utils';
import '../assets/_ListItem.scss';
import { useSelectedFileStore } from '../data/stores';
import type { ListItemProps } from '../types/base';

function ListItem({ file, idx }: ListItemProps) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setSelectedFile = useSelectedFileStore((store) => store.setSelectedFile);
	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const selectedFile = useSelectedFileStore((store) => store.selectedFile);

	return (
		<div onClick={() => setSelectedFile(file)} data-chosen={selectedFile === file} className='list-item-container'>
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
				<Image loading='lazy' height={48} width={48} quality={50} decoding='async' fetchPriority='low' key={getFolderName(poznavacka!) + idx} src={file.replaceAll(/\+/g, '%2B')} alt={`${getFolderName(poznavacka!)} - obrázek ${idx + 1}`} />
			</div>
		</div>
	);
}

export default ListItem;
