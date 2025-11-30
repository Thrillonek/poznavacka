import { useEffect, useState } from 'react';
import { getFiles, nameFromPath } from 'src/utils';
import '../assets/_SearchFormResults.scss';
import { useListSearchStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';

function SearchFormResults() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const isSearchInputFocused = useListSearchStore((store) => store.isSearchInputFocused);
	const setIsSearchInputFocused = useListSearchStore((store) => store.setIsSearchInputFocused);

	const [searchedArray, setSearchedArray] = useState<string[]>();

	function scrollToSearchResult(file: string) {
		scrollListToItem(file);
		setIsSearchInputFocused(false);
	}

	useEffect(() => {
		setSearchedArray(searchItem(undefined, true) as string[]);
	}, [searchInput]);

	if (!searchedArray || searchedArray.length == 0) return null;
	if (!searchInput || !isSearchInputFocused) return null;

	return (
		<div id='search-form-results' className='search-form-results'>
			{searchedArray.map((file, idx) => {
				const fileIndex = getFiles().indexOf(file);
				if (idx < 5)
					return (
						<button onClick={() => scrollToSearchResult(file)}>
							<div className='list-item-number'>
								<p data-length={(fileIndex + 1).toString().length}>{fileIndex + 1}</p>
							</div>
							<p>{nameFromPath(file)}</p>
						</button>
					);
			})}
		</div>
	);
}

export default SearchFormResults;
