import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, isObject, objFirstKey, objFirstValue } from 'src/utils';
import '../assets/_FSButton.scss';
import { handleFolderChange } from '../utils/handleFolderChange';
import { toggleFolderNesting } from '../utils/toggleFolderNesting';

function FSButton({ content }: { content: Folder }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	return (
		<div onClick={() => handleFolderChange(content)} className={'sidebar-option'}>
			<button className={objFirstKey(poznavacka!) == objFirstKey(content!) ? 'active' : ''}>{capitalize(objFirstKey(content!))}</button>
			{objFirstValue(content!).some((f: Folder | string) => isObject(f)) && (
				<button onClick={(e) => toggleFolderNesting(content, e)} className={objFirstKey(poznavacka!) == objFirstKey(content!) && objFirstValue(poznavacka!) != objFirstValue(content!) ? 'brightness-200' : ''}>
					<Icon icon='mdi:folder-eye'></Icon>
				</button>
			)}
		</div>
	);
}

export default FSButton;
