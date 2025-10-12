import { Icon } from '@iconify/react';
import { useRef } from 'react';
import { usePoznavackaStore } from 'src/data';
import { capitalize, isObject, objFirstKey, objFirstValue } from 'src/utils';
import { handleFolderChange } from '../utils/handleFolderChange';
import { toggleFolderNesting } from '../utils/toggleFolderNesting';

function FileSystemButton({ content }) {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	return (
		<div onClick={() => handleFolderChange(content)} className={'flex relative text-4xl gap-1'}>
			<p className={'text-neutral-500 cursor-pointer flex-grow py-2 pl-4 rounded-lg bg-neutral-900 font-medium transition-[filter] text-xl ' + (objFirstKey(poznavacka) == objFirstKey(content) ? 'brightness-200' : 'md:hover:brightness-150')}>{capitalize(objFirstKey(content))}</p>
			{objFirstValue(content).some((f) => isObject(f)) && (
				<button onClick={(e) => toggleFolderNesting(content, e)} className={'flex justify-center items-center rounded-lg bg-neutral-900 md:hover:brightness-150 px-2 outline-none text-neutral-500 ' + (objFirstKey(poznavacka) == objFirstKey(content) && objFirstValue(poznavacka) != objFirstValue(content) ? 'brightness-200' : '')}>
					<Icon icon='material-symbols:folder' className='text-2xl'></Icon>
				</button>
			)}
		</div>
	);
}

export default FileSystemButton;
