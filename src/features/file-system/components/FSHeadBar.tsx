import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import { getFolderName } from 'src/utils';
import '../assets/_FSHeadBar.scss';
import { useFileSystemStore, useMenuStore, usePathViewerStore, useSelectMultipleStore } from '../data/stores';
import { fileSystemGoBack } from '../utils/fileSystemGoBack';

function FSButton() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const closeMenu = useMenuStore((store) => store.close);

	const path = useFileSystemStore((store) => store.path);
	const folderName = useFileSystemStore((store) => store.folderName);
	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	const openPathViewer = usePathViewerStore((store) => store.open);

	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);

	return (
		<div className='flex gap-x-4 max-w-full overflow-hidden shrink-0'>
			<button onClick={() => closeMenu()} className='lg:hidden! sidebar-head-button square'>
				<Icon icon='mdi:close' />
			</button>
			<div className='flex items-center gap-x-2 overflow-hidden grow'>
				<button className={'sidebar-head-button square ' + (folderName && path.length > 0 && selectedFolder ? '' : 'hidden!')} onClick={() => fileSystemGoBack()}>
					<Icon icon='mdi:arrow-back' />
				</button>
				<button onClick={() => fileSystemGoBack(true)} className={'sidebar-head-button folder-name'}>
					{path.length > 0 && selectedFolder ? folderName : 'Poznávačky'}
				</button>
				<button onClick={() => openPathViewer()} className='h-full sidebar-head-button square'>
					<Icon icon='mdi:chevron-down' />
				</button>
			</div>
		</div>
	);
}

export default FSButton;
