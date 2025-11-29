import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import '../assets/_FSButton.scss';
import { handleFolderChange } from '../utils/handleFolderChange';
import { toggleFolderNesting } from '../utils/toggleFolderNesting';

function FSButton({ content }: { content: Folder }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	return (
		<div onClick={() => handleFolderChange(content)} className={'sidebar-option'}>
			<button className={getFolderName(poznavacka!) == getFolderName(content!) ? 'active' : ''}>{capitalize(getFolderName(content!))}</button>
			{getContent(content!).some((f: Folder | string) => isObject(f)) && (
				<button onClick={(e) => toggleFolderNesting(content, e)} className={getFolderName(poznavacka!) == getFolderName(content!) && getContent(poznavacka!) != getContent(content!) ? 'active' : ''}>
					<Icon icon='mdi:folder-eye'></Icon>
				</button>
			)}
		</div>
	);
}

export default FSButton;
