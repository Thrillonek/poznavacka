import { Icon } from '@iconify/react';
import { type FormEvent, type LegacyRef, useEffect, useRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import '../assets/_SearchForm.scss';
import { useListSearchStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';
import SearchFormResults from './SearchFormResults';

function SearchForm() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);
	const isSearchInputFocused = useListSearchStore((store) => store.isSearchInputFocused);
	const setIsSearchInputFocused = useListSearchStore((store) => store.setIsSearchInputFocused);
	const searchedItem = useListSearchStore((store) => store.searchedItem);
	const setSearchedItem = useListSearchStore((store) => store.setSearchedItem);

	const inputRef = useRef<HTMLInputElement>();

	function submitForm(e: FormEvent) {
		scrollListToItem(searchItem(e) as string);
		setSearchedItem(searchItem(e) as string);
		setIsSearchInputFocused(false);
	}

	useEffect(() => {
		if (searchedItem) setSearchedItem('');
	}, [searchInput]);

	useEffect(() => {
		if (isSearchInputFocused) {
			inputRef.current!.focus();
		} else {
			setSearchInput('');
		}
	}, [isSearchInputFocused]);

	useAddEventListener('mousedown', (e: MouseEvent) => {
		if (!['list-search-container', 'search-form-results'].some((item) => document.getElementById(item)?.contains(e.target as HTMLElement))) setIsSearchInputFocused(false);
	});

	return (
		<div data-visible={isSearchInputFocused} id='list-search-container' className='search-form-container'>
			<button onClick={() => setIsSearchInputFocused(true)} className='md:hidden search-form-open search-icon'>
				<Icon icon='mdi:magnify' />
			</button>
			<form tabIndex={0} onSubmit={submitForm} className='search-form'>
				<button onClick={() => inputRef.current?.focus()} className='search-icon'>
					<Icon icon='mdi:magnify' />
				</button>
				<button type='button' onClick={() => setIsSearchInputFocused(false)} className='md:hidden search-form-close search-icon'>
					<Icon icon='mdi:arrow-back' />
				</button>
				<input onFocus={() => setIsSearchInputFocused(true)} ref={inputRef as LegacyRef<HTMLInputElement>} placeholder='Hledat' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='search-input' />
				<button data-hidden={!searchInput} onClick={() => setSearchInput('')} className='search-icon'>
					<Icon icon='mdi:close' />
				</button>
			</form>
			<SearchFormResults />
		</div>
	);
}

export default SearchForm;
