import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import '../assets/_FSButton.scss';
import { useSelectMultipleStore } from '../data/stores';
import { handleFolderChange } from '../utils/handleFolderChange';
import { toggleFolderNesting } from '../utils/toggleFolderNesting';

function FSButton({ content }: { content: Folder }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);
	const selectedItems = useSelectMultipleStore((store) => store.selectedItems);

	const includesObject = getContent(content!).some((f: Folder | string) => isObject(f));

	let isActive = isSelecting ? selectedItems.includes(getFolderName(content!)) : getFolderName(poznavacka!) == getFolderName(content!);

	return (
		<div className={'sidebar-option'}>
			<button className='flex justify-between items-center' onClick={() => handleFolderChange(content)} data-active={isActive}>
				<span>{capitalize(getFolderName(content!))}</span>
			</button>
			{includesObject && (
				<button onClick={() => toggleFolderNesting(content)} data-active={isActive && getContent(poznavacka!) != getContent(content!)}>
					<Icon icon='mdi:folder-eye' />
				</button>
			)}
		</div>
	);
}

export default FSButton;
