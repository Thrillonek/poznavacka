import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import { isObject, objFirstKey, objFirstValue } from 'src/utils';
import '../assets/_FSHeadBar.scss';
import { useFileSystemStore, useMenuStore } from '../data/stores';
import { fileSystemGoBack } from '../utils/fileSystemGoBack';

function FSButton() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const toggleMenu = useMenuStore((store) => store.toggle);

	const path = useFileSystemStore((store) => store.path);
	const folderName = useFileSystemStore((store) => store.folderName);
	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	return (
		<div className='flex justify-between'>
			<div className='flex items-center gap-x-2'>
				<button className={'sidebar-head-button square ' + (folderName && path.length > 0 && selectedFolder ? '' : 'hidden')} onClick={() => fileSystemGoBack()}>
					<Icon icon='mdi:arrow-back' />
				</button>
				<button onClick={() => fileSystemGoBack(true)} className={'sidebar-head-button px-2 py-1 ' + (objFirstKey(poznavacka!) == folderName?.toLowerCase() && poznavacka && objFirstValue(poznavacka!).filter((f: any) => !isObject(f)).length > 0 ? 'active' : '')}>
					{path.length > 0 && selectedFolder ? folderName : 'Poznávačky'}
				</button>
				<button onClick={() => {}} className='h-full sidebar-head-button'>
					<Icon icon='mdi:chevron-right' />
				</button>
			</div>
			<button onClick={() => toggleMenu()} className='md:!hidden sidebar-head-button square'>
				<Icon icon='mdi:close' />
			</button>
		</div>
	);
}

export default FSButton;
