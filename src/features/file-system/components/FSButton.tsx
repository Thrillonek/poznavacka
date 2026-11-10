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

	let isActive = useMemo(() => checkPoznavackaIncludes(getContent(folder!), poznavacka), [folder, poznavacka]);

	return (
		<div className={'sidebar-option'}>
			<button className='flex items-center gap-x-4' onClick={() => handleFolderChange(folder)} data-active={isActive || (poznavacka && getContent(poznavacka).some((f: any) => extractedNestedContent.includes(f)) && includesObject)}>
				{includesObject ? (
					<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
						<path d='M0 0h24v24H0z' fill='none' />
						<path fill='currentColor' d='M22 4h-8l-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2M2 6H0v14a2 2 0 0 0 2 2h18v-2H2z' />
					</svg>
				) : (
					<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
						<path d='M0 0h24v24H0z' fill='none' />
						<path fill='currentColor' d='m5 17l4.5-6l3.5 4.5l2.5-3L19 17m1-11h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2' />
					</svg>
				)}

				<span>{capitalize(getFolderName(folder!))}</span>
			</button>
			{includesObject && (
				<button onClick={() => toggleFolderNesting(folder)} data-active={checkPoznavackaIncludes(extractedNestedContent, poznavacka!)}>
					<Icon icon='mdi:folder-eye' />
				</button>
			)}
		</div>
	);
}

export default FSButton;
