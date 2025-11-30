import ModeMenu from 'src/components/ui/ModeMenu';
import { isObject } from 'src/utils';
import '../assets/_Sidebar.scss';
import { useFileSystemStore, useMenuStore } from '../data/stores';
import FSButton from './FSButton';
import FSHeadBar from './FSHeadBar';
import PathViewer from './PathViewer';

export default function Sidebar() {
	const isMenuOpened = useMenuStore((store) => store.isOpened);

	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	return (
		<div className={'sidebar-container ' + (!isMenuOpened ? 'hide' : '')}>
			<PathViewer />
			<div className='flex flex-col gap-6'>
				<FSHeadBar />
				<div className='flex flex-col gap-1'>
					{selectedFolder!
						.filter((content) => isObject(content))
						.map((content, idx) => {
							let props = {
								content,
								idx,
							};
							return <FSButton key={'option-' + idx} {...props} />;
						})}
				</div>
			</div>
			<div className='max-md:hidden'>
				<ModeMenu />
			</div>
		</div>
	);
}
