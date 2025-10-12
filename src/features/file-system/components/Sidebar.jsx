import ModeMenu from '@/components/ui/ModeMenu';
import { fileSystem, usePoznavackaStore } from '@/data';
import { capitalize, isObject, objFirstKey, objFirstValue } from '@/utils';
import { Icon } from '@iconify/react';
import { useEffect, useRef, useState } from 'react';
import { useFileSystemStore, useMenuStore } from '../data/stores';
import { fileSystemGoBack } from '../utils/fileSystemGoBack';
import FileSystemButton from './FileSystemButton';
import Info from './Info';

export default function Sidebar() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setPoznavacka = usePoznavackaStore((store) => store.setPoznavacka);

	const toggleMenu = useMenuStore((store) => store.toggle);
	const isMenuOpened = useMenuStore((store) => store.isOpened);

	const path = useFileSystemStore((store) => store.path);
	const setSelectedFolder = useFileSystemStore((store) => store.setSelectedFolder);
	const setPath = useFileSystemStore((store) => store.setPath);
	const setFolderName = useFileSystemStore((store) => store.setFolderName);
	const folderName = useFileSystemStore((store) => store.folderName);
	const selectedFolder = useFileSystemStore((store) => store.selectedFolder);

	return (
		<div className={'z-10 bg-neutral-900 max-sm:w-full md:relative select-none absolute pt-4 transition-all duration-300 ease-in-out inset-0 overflow-hidden box-border w-[calc(5rem+20vw)] grid grid-cols-1 ' + (!isMenuOpened && 'max-md:-translate-x-full')}>
			<div className='flex flex-col justify-between'>
				<div className='px-2'>
					<div className='flex justify-between mb-4 px-1 text-neutral-500 text-2xl'>
						<button onClick={(e) => toggleMenu()} className='md:hidden'>
							<Icon icon='material-symbols:close-rounded'></Icon>
						</button>
						<button className='md:ml-auto' onClick={() => document.getElementById('menu-info').classList.add('scale-100')}>
							<Icon icon='material-symbols:info-outline-rounded'></Icon>
						</button>
					</div>
					<div id='menu-info' className='top-4 right-4 z-30 absolute bg-neutral-800 p-4 rounded-xl w-fit max-w-[calc(100%-2rem)] text-neutral-400 scale-0 origin-top-right transition-transform'>
						<Info />
					</div>
					<div className='relative flex justify-center items-center mb-2 py-2 rounded-lg'>
						<button className={'hover:bg-neutral-800 rounded-full absolute left-1 ' + (folderName && path.length > 0 && selectedFolder ? '' : 'hidden')} onClick={fileSystemGoBack}>
							<Icon icon='material-symbols:arrow-left-alt-rounded' className='px-1 text-neutral-500 text-4xl'></Icon>
						</button>
						<h1 onClick={() => fileSystemGoBack({ current })} className={'text-neutral-400 bg-neutral-900 py-1 w-1/2 text-center rounded-lg font-light tracking-wide text-2xl transition-all cursor-pointer ' + (objFirstKey(poznavacka) == folderName?.toLowerCase() && poznavacka && Object.values(poznavacka)[0].filter((f) => !isObject(f)).length > 0 ? 'brightness-150' : 'hover:brightness-125')}>
							{path.length > 0 && selectedFolder ? folderName : 'Poznávačky'}
						</h1>
					</div>
					<div className='flex flex-col gap-2'>
						{selectedFolder
							.filter((content) => isObject(content))
							.map((content, idx) => {
								let props = {
									content,
									idx,
								};
								return <FileSystemButton key={'option-' + idx} {...props} />;
							})}
					</div>
				</div>
				<div className='max-md:hidden'>
					<ModeMenu />
				</div>
			</div>
		</div>
	);
}
