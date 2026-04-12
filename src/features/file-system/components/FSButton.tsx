import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import { compareArrays } from 'src/utils/compareArrays';
import '../assets/_FSButton.scss';
import { useSelectMultipleStore } from '../data/stores';
import { handleFolderChange } from '../utils/handleFolderChange';
import { extractNestedContent, toggleFolderNesting } from '../utils/toggleFolderNesting';

function FSButton({ folder }: { folder: Folder }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);
	const selectedItems = useSelectMultipleStore((store) => store.selectedItems);

	const includesObject = getContent(folder!).some((f: Folder | string) => isObject(f));

	let isActive = isSelecting ? selectedItems.includes(getFolderName(folder!)) : getFolderName(poznavacka!) === getFolderName(folder!);

	const extractedNestedContent = useMemo(() => extractNestedContent(folder), [folder]);

	return (
		<div className={'sidebar-option'}>
			<button className='flex justify-between items-center' onClick={() => handleFolderChange(folder)} data-active={isActive}>
				<span>{capitalize(getFolderName(folder!))}</span>
			</button>
			{includesObject && (
				<button onClick={() => toggleFolderNesting(folder)} data-active={isActive && compareArrays(getContent(poznavacka!), extractedNestedContent)}>
					<Icon icon='mdi:folder-eye' />
				</button>
			)}
		</div>
	);
}

export default FSButton;
