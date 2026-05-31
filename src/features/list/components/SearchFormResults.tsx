import { useEffect, useRef, useState } from 'react';
import { useCompletedFilesStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles, nameFromPath } from 'src/utils';
import '../assets/_SearchFormResults.scss';
import { useListSearchStore, useSelectedFileStore } from '../data/stores';
import { scrollListToItem } from '../utils/scrollListToItem';
import { searchItem } from '../utils/searchItem';

function SearchFormResults() {
	const searchInput = useListSearchStore((store) => store.searchInput);
	const isSearchInputFocused = useListSearchStore((store) => store.isSearchInputFocused);
	const setIsSearchInputFocused = useListSearchStore((store) => store.setIsSearchInputFocused);
	const setSelectedFile = useSelectedFileStore((store) => store.setSelectedFile);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const settings = useSettingsStore((store) => store.settings);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const searchFormResultsRef = useRef<HTMLDivElement>(null);

	const [searchedArray, setSearchedArray] = useState<string[]>();
	const [emptySearch, setEmptySearch] = useState(false);

	function scrollToSearchResult(file: string) {
		scrollListToItem(file);
		setIsSearchInputFocused(false);
		setSelectedFile(file);
	}

	const prevSearchInputRef = useRef<string>();
	useEffect(() => {
		setEmptySearch(false);
		prevSearchInputRef.current = searchInput;
		setTimeout(() => {
			if (prevSearchInputRef.current === searchInput) {
				let newSearchedArray = searchItem(undefined, true) as string[];
				setSearchedArray(newSearchedArray);
				if (newSearchedArray.length === 0) {
					setEmptySearch(true);
				}
			}
		}, 250);
	}, [searchInput, poznavacka]);

	const existsSearchArray = searchedArray && searchedArray.length > 0;

	function verifyConditions() {
		if (!isSearchInputFocused || !searchInput) return false;
		return true;
	}

	useEffect(() => {
		if (isSearchInputFocused) searchFormResultsRef.current?.scrollTo(0, 0);
	}, [isSearchInputFocused]);

	return (
		<div data-visible={verifyConditions()} ref={searchFormResultsRef} id='search-form-results' className='search-form-results'>
			{existsSearchArray
				? searchedArray.map((file) => {
						const fileIndex = getFiles().indexOf(file);
						if (settings.list.showFiles == 'completed' && !completedFiles.includes(file)) return null;
						if (settings.list.showFiles == 'uncompleted' && completedFiles.includes(file)) return null;
						return (
							<button onClick={() => scrollToSearchResult(file)}>
								<div className='list-item-number'>
									<p data-length={(fileIndex + 1).toString().length}>{fileIndex + 1}</p>
								</div>
								<p className='ml-2'>{nameFromPath(file)}</p>
							</button>
						);
					})
				: emptySearch && <p>Nic nenalezeno.</p>}
		</div>
	);
}

export default SearchFormResults;
