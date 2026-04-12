import { Icon } from '@iconify/react';
import ModeMenu from 'src/components/ui/ModeMenu';
import { isObject } from 'src/utils';
import '../assets/_Sidebar.scss';
import { useFileSystemStore, useMenuStore, useSelectMultipleStore } from '../data/stores';
import { useHandleSelectMultipleToggle } from '../hooks/useHandleSelecMultipleToggle';
import { viewCurrentFolderContent } from '../utils/viewCurrentFolderContent';
import FSButton from './FSButton';
import FSHeadBar from './FSHeadBar';
import PathViewer from './PathViewer';

export default function Sidebar() {
	const isMenuOpened = useMenuStore((store) => store.isOpened);
	const closeMenu = useMenuStore((store) => store.close);

	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	const isSelectingMultiple = useSelectMultipleStore((store) => store.isSelecting);
	const toggleSelectMultiple = useSelectMultipleStore((store) => store.toggleSelection);
	const selectedItems = useSelectMultipleStore((store) => store.selectedItems);
	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);

	useHandleSelectMultipleToggle();

	return (
		<div className={'sidebar-container ' + (!isMenuOpened ? 'hide' : '')}>
			<PathViewer />
			<div className='flex flex-col gap-4 min-h-0 grow'>
				<FSHeadBar />
				<div className='flex flex-col gap-1'>
					<div className='sidebar-option normal-styling'>
						<button data-active-gradient={isSelectingMultiple} onClick={() => toggleSelectMultiple()} className='flex justify-between items-center'>
							<span>Vybrat více poznávaček</span>
							{!isSelectingMultiple && <Icon icon='mdi:folder-multiple-plus' className='text-xl' />}
						</button>
						{isSelectingMultiple && (
							<>
								<button onClick={() => toggleSelectMultiple(false)}>
									<Icon icon='mdi:close' className='text-xl' />
								</button>
								<button onClick={() => closeMenu()}>
									<Icon icon='mdi:arrow-right' className='text-xl' />
								</button>
							</>
						)}
					</div>
					{selectedFolder?.some((f) => !isObject(f)) && (
						<div className={'sidebar-option normal-styling ' + (!isSelectingMultiple ? 'sm:hidden!' : '')}>
							<button data-active={isSelectingMultiple && selectedItems.includes('this')} onClick={viewCurrentFolderContent} className='flex justify-between items-center'>
								<span>{isSelecting ? 'O' : 'Prohlédnout o'}bsah této složky</span> {!isSelectingMultiple && <Icon icon='mdi:arrow-right' className='text-xl' />}
							</button>
						</div>
					)}
				</div>
				<div className='flex flex-col gap-1 overflow-auto grow'>
					<h2 className='pl-1 text-muted text-sm'>Poznávačky v této složce</h2>

					{selectedFolder
						?.filter((content) => isObject(content))
						.map((content, idx) => {
							let props = {
								content,
								idx,
							};
							return <FSButton key={'option-' + idx} {...props} />;
						})}
				</div>
			</div>

			<div>
				<div className='sm:hidden lg:block'>
					<ModeMenu />
				</div>
				{window.location.hostname.includes('test') && <div className='bg-light shadow-round mt-1 p-1 rounded-lg font-bold text-muted text-xs text-center'>NEJNOVĚJŠÍ (BETA) VERZE</div>}
			</div>
		</div>
	);
}
