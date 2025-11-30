import { Icon } from '@iconify/react';
import { type FormEvent, useRef } from 'react';
import '../assets/_SearchForm.scss';
import { useListSearchStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';
import SearchFormResults from './SearchFormResults';

function SearchForm() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);

	function submitForm(e: FormEvent) {
		scrollListToItem(searchItem(e) as string);
	}

	const inputRef = useRef<HTMLInputElement>(null) as any;

	return (
		<div className='search-form-container'>
			<form tabIndex={0} onSubmit={submitForm} className='search-form'>
				<Icon icon='mdi:magnify' onClick={() => inputRef.current.focus()} className='search-icon' />
				<input ref={inputRef} placeholder='Hledat' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='search-input' />
				<Icon data-hidden={!searchInput} icon='mdi:close' onClick={() => setSearchInput('')} className='search-icon' />
			</form>
			<SearchFormResults />
		</div>
	);
}

export default SearchForm;
