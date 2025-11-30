import { Icon } from '@iconify/react';
import { type FormEvent, useEffect, useRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import '../assets/_SearchForm.scss';
import { useListSearchStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';
import SearchFormResults from './SearchFormResults';

function SearchForm() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);
	const setIsSearchInputFocused = useListSearchStore((store) => store.setIsSearchInputFocused);
	const setSearchedItem = useListSearchStore((store) => store.setSearchedItem);

	function submitForm(e: FormEvent) {
		scrollListToItem(searchItem(e) as string);
		setSearchedItem(searchItem(e) as string);
		setIsSearchInputFocused(false);
	}

	useEffect(() => {
		setSearchedItem('');
	}, [searchInput]);

	useAddEventListener('mousedown', (e: MouseEvent) => {
		if (!['list-search-container', 'search-form-results'].some((item) => document.getElementById(item)?.contains(e.target as HTMLElement))) setIsSearchInputFocused(false);
	});

	const inputRef = useRef<HTMLInputElement>(null) as any;

	return (
		<div id='list-search-container' className='search-form-container'>
			<form tabIndex={0} onSubmit={submitForm} className='search-form'>
				<Icon icon='mdi:magnify' onClick={() => inputRef.current.focus()} className='search-icon' />
				<input onFocus={() => setIsSearchInputFocused(true)} ref={inputRef} placeholder='Hledat' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='search-input' />
				<Icon data-hidden={!searchInput} icon='mdi:close' onClick={() => setSearchInput('')} className='search-icon' />
			</form>
			<SearchFormResults />
		</div>
	);
}

export default SearchForm;
