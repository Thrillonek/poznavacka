import { Icon } from '@iconify/react';
import ModeMenu from 'src/components/ui/ModeMenu';
import { isObject } from 'src/utils';
import '../assets/_Sidebar.scss';
import { useFileSystemStore, useMenuStore } from '../data/stores';
import FSButton from './FSButton';
import FSHeadBar from './FSHeadBar';
import PathViewer from './PathViewer';

export default function Sidebar() {
	const isMenuOpened = useMenuStore((store) => store.isOpened);
	const closeMenu = useMenuStore((store) => store.close);

	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	return (
		<div className={'sidebar-container ' + (!isMenuOpened ? 'hide' : '')}>
			<PathViewer />
			<div className='flex flex-col gap-4 overflow-hidden grow'>
				<FSHeadBar />
				<div className='flex flex-col gap-1 overflow-auto grow'>
					{selectedFolder?.some((f) => !isObject(f)) && (
						<div onClick={() => closeMenu()} className='sm:hidden! sidebar-option'>
							<button className='flex justify-between items-center font-normal! text-base!'>
								Prohlédnout obsah této složky <Icon icon='mdi:arrow-right' className='text-xl' />
							</button>
						</div>
					)}
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
