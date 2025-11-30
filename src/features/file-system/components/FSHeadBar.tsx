import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import { getFolderName } from 'src/utils';
import '../assets/_FSHeadBar.scss';
import { useFileSystemStore, useMenuStore, usePathViewerStore } from '../data/stores';
import { fileSystemGoBack } from '../utils/fileSystemGoBack';

function FSButton() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const closeMenu = useMenuStore((store) => store.close);

	const path = useFileSystemStore((store) => store.path);
	const folderName = useFileSystemStore((store) => store.folderName);
	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	const openPathViewer = usePathViewerStore((store) => store.open);

	return (
		<div className='flex justify-between'>
			<div className='flex items-center gap-x-2'>
				<button className={'sidebar-head-button square ' + (folderName && path.length > 0 && selectedFolder ? '' : '!hidden')} onClick={() => fileSystemGoBack()}>
					<Icon icon='mdi:arrow-back' />
				</button>
				<button onClick={() => fileSystemGoBack(true)} className={'sidebar-head-button folder-name ' + (poznavacka && getFolderName(poznavacka!).toLowerCase() == folderName?.toLowerCase() ? 'active' : '')}>
					{path.length > 0 && selectedFolder ? folderName : 'Poznávačky'}
				</button>
				<button onClick={() => openPathViewer()} className='h-full sidebar-head-button'>
					<Icon icon='mdi:chevron-right' />
				</button>
			</div>
			<button onClick={() => closeMenu()} className='lg:!hidden sidebar-head-button square'>
				<Icon icon='mdi:close' />
			</button>
		</div>
	);
}

export default FSButton;
