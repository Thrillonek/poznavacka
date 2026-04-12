import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import { checkPoznavackaIncludes } from 'src/utils/checkPoznavackaIncludes';
import '../assets/_FSButton.scss';
import { useFileSystemStore, useSelectMultipleStore } from '../data/stores';
import { handleFolderChange } from '../utils/handleFolderChange';
import { extractNestedContent, toggleFolderNesting } from '../utils/toggleFolderNesting';

function FSButton({ folder }: { folder: Folder }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);

	const includesObject = getContent(folder!).some((f: Folder | string) => isObject(f));

	let isActive = isSelecting ? checkPoznavackaIncludes(getContent(folder!)) : getFolderName(poznavacka!) === getFolderName(folder!);

	const extractedNestedContent = useMemo(() => extractNestedContent(folder), [folder]);

	return (
		<div className={'sidebar-option'}>
			<button className='flex justify-between items-center' onClick={() => handleFolderChange(folder)} data-active={isActive}>
				<span>{capitalize(getFolderName(folder!))}</span>
			</button>
			{includesObject && (
				<button onClick={() => toggleFolderNesting(folder)} data-active={isActive && checkPoznavackaIncludes(extractedNestedContent)}>
					<Icon icon='mdi:folder-eye' />
				</button>
			)}
		</div>
	);
}

export default FSButton;
