import { Icon } from '@iconify/react';
import { type FormEvent, type LegacyRef, useEffect, useRef } from 'react';
import { useAddEventListener } from 'src/hooks';
import '../assets/_SearchForm.scss';
import { useChosenFileStore, useListSearchStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';
import SearchFormResults from './SearchFormResults';

function SearchForm() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);
	const isSearchInputFocused = useListSearchStore((store) => store.isSearchInputFocused);
	const setIsSearchInputFocused = useListSearchStore((store) => store.setIsSearchInputFocused);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);

	const inputRef = useRef<HTMLInputElement>();

	function submitForm(e: FormEvent) {
		const searchedItem = searchItem(e) as string;
		scrollListToItem(searchedItem);
		setIsSearchInputFocused(false);
		setChosenFile(searchedItem);
	}

	useEffect(() => {
		if (isSearchInputFocused) {
			inputRef.current!.focus();
		} else {
			if (window.innerWidth < 768) {
				setSearchInput('');
			}
		}
	}, [isSearchInputFocused]);

	useAddEventListener('mousedown', (e: MouseEvent) => {
		if (!['list-search-container', 'search-form-results'].some((item) => document.getElementById(item)?.contains(e.target as HTMLElement))) setIsSearchInputFocused(false);
	});

	function deleteInput() {
		setSearchInput('');
		inputRef.current!.focus();
	}

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
				<button data-hidden={!searchInput} onClick={deleteInput} className='search-icon'>
					<Icon icon='mdi:close' />
				</button>
			</form>
			<SearchFormResults />
		</div>
	);
}

export default SearchForm;
