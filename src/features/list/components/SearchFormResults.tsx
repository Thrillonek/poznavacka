import { useEffect, useState } from 'react';
import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import { getFiles, nameFromPath } from 'src/utils';
import '../assets/_SearchFormResults.scss';
import { useListSearchStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';

function SearchFormResults() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const isSearchInputFocused = useListSearchStore((store) => store.isSearchInputFocused);
	const setIsSearchInputFocused = useListSearchStore((store) => store.setIsSearchInputFocused);
	const setSearchedItem = useListSearchStore((store) => store.setSearchedItem);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const settings = useSettingsStore((store) => store.settings);

	const [searchedArray, setSearchedArray] = useState<string[]>();

	function scrollToSearchResult(file: string) {
		scrollListToItem(file);
		setIsSearchInputFocused(false);
		setSearchedItem(file);
	}

	useEffect(() => {
		setSearchedArray(searchItem(undefined, true) as string[]);
	}, [searchInput]);

	const checkSearchedArray = searchedArray && searchedArray.length > 0;

	function verifyConditions() {
		if (!isSearchInputFocused || !searchInput) return false;
		return true;
	}

	return (
		<div data-visible={verifyConditions()} id='search-form-results' className='search-form-results'>
			{checkSearchedArray &&
				searchedArray.map((file, idx) => {
					const fileIndex = getFiles().indexOf(file);
					if (settings.list.showFiles == 'completed' && !completedFiles.includes(file)) return null;
					if (settings.list.showFiles == 'uncompleted' && completedFiles.includes(file)) return null;
					if (idx < 10)
						return (
							<button onClick={() => scrollToSearchResult(file)}>
								<div className='list-item-number'>
									<p data-length={(fileIndex + 1).toString().length}>{fileIndex + 1}</p>
								</div>
								<p className='ml-2'>{nameFromPath(file)}</p>
							</button>
						);
				})}
		</div>
	);
}

export default SearchFormResults;
