import { Icon } from '@iconify/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize } from 'src/utils/formatting';
import '../assets/_FSSearch.scss';
import { useFileSystemStore, useMenuStore, useSelectMultipleStore } from '../data/stores';
import { searchFS } from '../utils/searchFS';
import { toggleSet } from '../utils/selectMultipleFunctionMutators';

export default function FSSearch() {
	const [isSearching, setIsSearching] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [searchResults, setSearchResults] = useState<any[] | null>([]);
	const inputRef = useRef<HTMLInputElement>(null);

	const setPath = useFileSystemStore((state) => state.setPath);
	const setSelectedFolder = useFileSystemStore((state) => state.setSelectedFolder);
	const setFolderName = useFileSystemStore((state) => state.setFolderName);
	const setPoznavacka = usePoznavackaStore((state) => state.setPoznavacka);
	const closeMenu = useMenuStore((state) => state.close);
	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);

	const lastInputValue = useRef<string>();

	const handleButtonClick = () => {
		setIsSearching(true);
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	useEffect(() => {
		lastInputValue.current = inputValue;

		setTimeout(() => {
			if (lastInputValue.current === inputValue) {
				let searchRes = searchFS(inputValue);
				setSearchResults(searchRes);
			}
		}, 250);
	}, [inputValue]);

	function handleSetFolder(folderObject: { path: string; content: any[] }) {
		setPath(folderObject.path.split('/'));
		setFolderName(capitalize(folderObject.path.split('/').at(-1)!) ?? null);
		setSelectedFolder(folderObject.content);
		closeMenu();

		const folder = { [folderObject.path.split('/').at(-1)!]: folderObject.content } as any;

		if (isSelecting) {
			toggleSet(folder, false);
		} else {
			setPoznavacka(folder);
		}

		setIsSearching(false);
		setInputValue('');
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		setInputValue(e.target.value);
		setSearchResults([]);
	}

	return (
		<div className={clsx('sidebar-option normal-styling')}>
			<button className={clsx('flex items-center gap-4')} onClick={handleButtonClick}>
				<Icon icon='mdi:search' />
				<span>Hledat složku</span>
			</button>

			<div className={clsx('z-10 absolute inset-0 flex flex-col gap-4 bg-base p-4 text-muted transition-opacity', !isSearching && 'pointer-events-none opacity-0')}>
				<div className='flex items-center gap-2'>
					<button className='fssearch-back' onClick={() => setIsSearching(false)}>
						<Icon icon='mdi:arrow-left' className='text-xl' />
					</button>
					<h3 className='font-semibold text-main text-lg'>Hledat složku</h3>
				</div>
				<div className='flex gap-1 w-full bg-dark rounded border border-(--border)'>
					<input ref={inputRef} value={inputValue} onChange={handleInputChange} type='text' className='px-2 py-1 outline-none! w-full h-full' />
					<button onClick={() => setInputValue('')} className={clsx('p-1', !inputValue && 'pointer-events-none invisible')}>
						<Icon icon='mdi:close' className='text-xl' />
					</button>
				</div>
				{searchResults && searchResults.length > 0 ? (
					<div className='flex flex-col gap-2 min-h-0 max-h-full overflow-auto'>
						{searchResults.map((result, index) => (
							<button onClick={() => handleSetFolder(result)} key={index} className='bg-light-hover p-2 rounded text-start'>
								<p className='text-xs'>{result.path.split('/').slice(0, -1).join(' / ')} /</p>
								<p className='mt-1 font-semibold text-main'>{capitalize(result.path.split('/').at(-1)!)}</p>
							</button>
						))}
					</div>
				) : (
					inputValue && searchResults === null && <p className='text-muted'>Žádná složka nenalezena</p>
				)}
			</div>
		</div>
	);
}
