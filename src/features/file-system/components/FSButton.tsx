import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import { checkPoznavackaIncludes } from 'src/utils/checkPoznavackaIncludes';
import '../assets/_FSButton.scss';
import { handleFolderChange } from '../utils/handleFolderChange';
import { extractNestedContent, toggleFolderNesting } from '../utils/toggleFolderNesting';

function FSButton({ folder }: { folder: Folder }) {
	const poznavacka = usePoznavackaStore((state) => state.poznavacka);

	const includesObject = getContent(folder!).some((f: Folder | string) => isObject(f));

	const extractedNestedContent = useMemo(() => extractNestedContent(folder), [folder]);

	let isActive = useMemo(() => checkPoznavackaIncludes(getContent(folder!)), [folder, poznavacka]);

	return (
		<div className={'sidebar-option'}>
			<button className='flex justify-between items-center' onClick={() => handleFolderChange(folder)} data-active={isActive || (getContent(poznavacka!).some((f: any) => extractedNestedContent.includes(f)) && includesObject)}>
				<span>{capitalize(getFolderName(folder!))}</span>
			</button>
			{includesObject && (
				<button onClick={() => toggleFolderNesting(folder)} data-active={checkPoznavackaIncludes(extractedNestedContent)}>
					<Icon icon='mdi:folder-eye' />
				</button>
			)}
		</div>
	);
}

export default FSButton;
