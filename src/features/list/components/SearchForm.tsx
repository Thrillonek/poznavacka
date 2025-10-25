import { Icon } from '@iconify/react';
import type { MouseEvent } from 'react';
import { useState } from 'react';
import { useListSearchStore } from '../data/stores';
import { searchItem } from '../utils/searchItem';

function SearchForm() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);

	const [searchVisible, setSearchVisible] = useState(false);

	function toggleSearch(e: MouseEvent) {
		e.preventDefault();
		document.getElementById('list-search')!.classList.toggle('!w-full');
		document.getElementById('list-search')!.classList.toggle('border');
		setSearchVisible(!searchVisible);
	}

	return (
		<div className='top-4 right-4 z-40 absolute max-w-[calc(100%-2rem)] overflow-hidden'>
			<form tabIndex={0} onKeyDown={(e) => e.key == 'Enter' && searchItem(e)} className='relative flex justify-end items-center gap-2'>
				<div id='list-search' className='z-20 relative flex items-center bg-neutral-700 border-neutral-600 rounded-full w-0 min-w-0 h-10 overflow-hidden transition-[width] duration-300'>
					<input placeholder={'Hledat název/číslo'} onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='flex-grow bg-inherit ml-4 outline-none w-full h-full placeholder:font-normal font-semibold text-neutral-400 placeholder:text-neutral-500 caret-neutral-400' />
					<Icon icon='material-symbols:close-rounded' onClick={() => setSearchInput('')} className={'text-2xl ml-2 mr-4 text-neutral-500 cursor-pointer ' + (!searchInput && 'pointer-events-none opacity-0')} />
				</div>
				<button onClick={toggleSearch} className='bg-neutral-600 rounded-full outline-none min-w-10 aspect-square text-neutral-400'>
					{searchVisible ? <Icon icon='material-symbols:close-rounded' className='mx-2 text-2xl' /> : <Icon icon='material-symbols:search-rounded' className='mx-2 text-2xl' />}
				</button>
			</form>
		</div>
	);
}

export default SearchForm;
