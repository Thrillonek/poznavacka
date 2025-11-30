import { Icon } from '@iconify/react';
import type { FormEvent } from 'react';
import '../assets/_SearchForm.scss';
import { useListSearchStore } from '../data/stores';
import { searchItem } from '../utils/searchItem';

function SearchForm() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const setSearchInput = useListSearchStore((store) => store.setSearchInput);

	function submitForm(e: FormEvent) {
		e.preventDefault();
		searchItem(e);
	}

	return (
		<form tabIndex={0} onSubmit={submitForm} className='search-form'>
			<Icon icon='mdi:magnify' onClick={() => {}} className='search-icon' />
			<input placeholder='Hledat' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} type='text' className='search-input' />
		</form>
	);
}

export default SearchForm;
