import { dir as fileSystem, usePoznavackaStore } from '@/data';
import { capitalize, isObject, objFirstKey, objFirstValue } from '@/utils';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useMenuStore } from '../data/stores';

export default function Sidebar() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setPoznavacka = usePoznavackaStore((store) => store.setPoznavacka);

	const closeMenu = useMenuStore((store) => store.close);
	const toggleMenu = useMenuStore((store) => store.toggle);
	const isMenuOpened = useMenuStore((store) => store.isOpened);

	// const [loaded, setLoaded] = useState(false);
	const [selectedDir, setSelectedDir] = useState(fileSystem);
	const [path, setPath] = useState([]);
	const [dirName, setDirName] = useState();

	function handleFolderChange(pozn) {
		setPoznavacka(pozn);
		let content = Object.values(pozn)[0];
		if (content.some((c) => isObject(c))) {
			setPath((p) => [...p, Object.keys(pozn)[0]]);
			setSelectedDir(Object.values(pozn)[0]);
			setDirName(capitalize(Object.keys(pozn)[0]));
		} else closeMenu();
	}

	// useEffect(() => {
	// 	if (!path[0]) return;
	// 	for (let i of path) {
	// 		if (path.indexOf(i) == path.length - 1) break;
	// 		Object.values(fileSystem.find((f) => Object.keys(f)[0] == path[0]))[0];
	// 	}
	// }, [path]);

	function fileSystemGoBack({ current }) {
		let currentArr = fileSystem;
		let currentObject;

		// Loop that goes through every level of the file system to find the right folder (dir)
		for (let i of path) {
			if (path.indexOf(i) == path.length - 1 && !current) break;
			currentObject = currentArr.find((f) => Object.keys(f)[0] == i);
			currentArr = Object.values(currentObject)[0];
		}
		// method is current when trying to view the content of the current folder (dir)
		if (current) {
			setPoznavacka(currentObject);
		} else {
			let newPath = [...path];
			newPath.pop();
			setPath(newPath);
			setSelectedDir(currentArr);
			currentObject ? setDirName(Object.keys(currentObject)[0][0].toUpperCase() + Object.keys(currentObject)[0].slice(1)) : setDirName('');
		}
	}

	function toggleFolderNesting(content, event) {
		event.stopPropagation();
		if (poznavacka != content) setPoznavacka(content);

		let arr = Object.values(content)[0];
		while (arr.some((f) => isObject(f))) {
			let obj = arr.find((f) => isObject(f));
			arr = arr.concat(Object.values(obj)[0]);
			arr.splice(arr.indexOf(obj), 1);
		}
		setPoznavacka({ [Object.keys(content)[0]]: arr });
		closeMenu();
	}

	return (
		<div className={'z-10 bg-neutral-900 max-sm:w-full md:relative select-none absolute pt-4 transition-all duration-300 ease-in-out inset-0 overflow-hidden box-border w-[calc(5rem+20vw)] grid grid-cols-1 ' + (!isMenuOpened && 'max-md:-translate-x-full')}>
			<div className='px-2'>
				<div className='flex justify-between mb-4 px-1 text-neutral-500 text-2xl'>
					<button onClick={(e) => toggleMenu()} className='md:hidden'>
						{/* <i className='fa-solid fa-xmark'></i> */}
						<Icon icon='material-symbols:close-rounded'></Icon>
					</button>
					<button className='md:ml-auto' onClick={() => document.getElementById('menu-info').classList.add('scale-100')}>
						<Icon icon='material-symbols:info-outline-rounded' className=''></Icon>
					</button>
				</div>
				<div id='menu-info' className='top-4 right-4 z-30 absolute bg-neutral-800 p-4 rounded-xl w-fit max-w-[calc(100%-2rem)] text-neutral-400 scale-0 origin-top-right transition-transform'>
					<div className='flex justify-between items-center mb-2'>
						<h3 className='font-semibold text-neutral-300 text-lg'>Info</h3>
						<button className='block ml-auto' onClick={() => document.getElementById('menu-info').classList.remove('scale-100')}>
							<Icon icon='meteor-icons:xmark' className='text-xl'></Icon>
						</button>
					</div>
					<p>
						Pro vyzkoušení z obsahu celé složky, klikněte na ikonu <i className='text-base fa-folder fa-regular' />
						<br />
						<br />
						Po zvolení vaší poznávačky zavřete menu kliknutím na ikonu <i className='text-base fa-solid fa-xmark' />
					</p>
				</div>
				<div className='relative flex justify-center items-center mb-2 py-2 rounded-lg'>
					<button className={'hover:bg-neutral-800 rounded-full absolute left-1 ' + (dirName && path.length > 0 && selectedDir ? '' : 'hidden')} onClick={fileSystemGoBack}>
						{/* <i className='fa-arrow-left px-1 text-neutral-500 text-lg fa-solid' /> */}
						<Icon icon='material-symbols:arrow-left-alt-rounded' className='px-1 text-neutral-500 text-4xl'></Icon>
					</button>
					<h1 onClick={() => fileSystemGoBack({ current })} className={'text-neutral-400 bg-neutral-900 py-1 w-1/2 text-center rounded-lg font-light tracking-wide text-2xl transition-all cursor-pointer ' + (objFirstKey(poznavacka) == dirName?.toLowerCase() && poznavacka && Object.values(poznavacka)[0].filter((f) => !isObject(f)).length > 0 ? 'brightness-150' : 'hover:brightness-125')}>
						{path.length > 0 && selectedDir ? dirName : 'Poznávačky'}
					</h1>
				</div>
				<div className='flex flex-col gap-2'>
					{selectedDir
						.filter((content) => isObject(content))
						.map((content, idx) => {
							return (
								<div onClick={() => handleFolderChange(content)} key={'option-' + idx} className={'flex relative text-4xl gap-1'}>
									{/* <i className='fa-arrow-right mr-6 text-3xl fa-solid'></i> */}
									<p className={'text-neutral-500 cursor-pointer flex-grow py-2 pl-4 rounded-lg bg-neutral-900 font-medium transition-[filter] text-xl ' + (objFirstKey(poznavacka) == objFirstKey(content) ? 'brightness-200' : 'md:hover:brightness-150')}>{Object.keys(content)[0].charAt(0).toUpperCase() + Object.keys(content)[0].slice(1)}</p>
									{Object.values(content)[0].some((f) => isObject(f)) && (
										<button onClick={(e) => toggleFolderNesting(content, e)} className={'flex justify-center items-center rounded-lg bg-neutral-900 md:hover:brightness-150 px-2 outline-none text-neutral-500 ' + (objFirstKey(poznavacka) == objFirstKey(content) && objFirstValue(poznavacka) != objFirstValue(content) ? 'brightness-200' : '')}>
											<Icon icon='material-symbols:folder' className='text-2xl'></Icon>
										</button>
									)}
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}
