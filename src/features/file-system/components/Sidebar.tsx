import { Icon } from '@iconify/react';
import { useEffect, useMemo } from 'react';
import ModeMenu from 'src/components/ui/ModeMenu';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getContent, getFolderName, isObject } from 'src/utils';
import { checkPoznavackaIncludes } from 'src/utils/checkPoznavackaIncludes';
import '../assets/_Sidebar.scss';
import { useFileSystemStore, useMenuStore, useSelectMultipleStore } from '../data/stores';
import { useShowOnlyCompletedFiles } from '../hooks/useShowOnlyCompletedFiles';
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
	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const isCurrentFolderActive = useMemo(() => checkPoznavackaIncludes(selectedFolder, poznavacka), [poznavacka]);

	const showOnlyCompletedFiles = useShowOnlyCompletedFiles();

	return (
		<div className={'sidebar-container ' + (!isMenuOpened ? 'hide' : '')}>
			<PathViewer />
			<div className='flex flex-col gap-4 min-h-0 grow'>
				<FSHeadBar />
				<div className='flex flex-col gap-1'>
					<div className='sidebar-option normal-styling'>
						<button data-active={poznavacka && getContent(poznavacka) === completedFiles && getFolderName(poznavacka) === '*completed*'} onClick={() => showOnlyCompletedFiles()} className='flex items-center gap-4'>
							<Icon icon='mdi:checkbox-multiple-marked-circle-outline' />
							<span>Zobrazit všechny naučené</span>
						</button>
					</div>
					<div className='sidebar-option normal-styling'>
						<button data-active-gradient={isSelectingMultiple} onClick={() => toggleSelectMultiple()} className='flex items-center gap-4'>
							{!isSelectingMultiple && <Icon icon='mdi:folder-multiple-plus' />}
							<span>Vybrat více poznávaček</span>
						</button>
						{isSelectingMultiple && (
							<>
								<button onClick={() => toggleSelectMultiple(false)}>
									<Icon icon='mdi:close' />
								</button>
								<button className='sm:hidden' onClick={() => closeMenu()}>
									<Icon icon='mdi:arrow-right' />
								</button>
							</>
						)}
					</div>
					{selectedFolder?.some((f) => !isObject(f)) && (
						<div className={'sidebar-option normal-styling ' + (!isSelectingMultiple ? 'sm:hidden!' : '')}>
							<button data-active={isSelectingMultiple && isCurrentFolderActive} onClick={viewCurrentFolderContent} className='flex justify-between items-center'>
								<span>{isSelecting ? 'O' : 'Prohlédnout o'}bsah této složky</span> {!isSelectingMultiple && <Icon icon='mdi:arrow-right' className='text-xl' />}
							</button>
						</div>
					)}
				</div>
				<div className='h-px w-full bg-(--border)' />
				<div className='flex flex-col gap-1 overflow-auto grow'>
					{selectedFolder
						?.filter((content) => isObject(content))
						.map((content, idx) => {
							let props = {
								folder: content,
								idx,
							};
							return <FSButton key={'option-' + idx} {...props} />;
						})}
				</div>
			</div>

			<div>
				<div className='sm:hidden lg:block'>
					<ModeMenu closeMenu={closeMenu} />
				</div>
				{window.location.hostname.includes('test') && <div className='bg-light shadow-round mt-1 p-1 rounded-lg font-bold text-muted text-xs text-center'>NEJNOVĚJŠÍ (BETA) VERZE</div>}
			</div>
		</div>
	);
}
