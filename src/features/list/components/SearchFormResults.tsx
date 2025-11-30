import '../assets/_SearchFormResults.scss';
import { useListSearchStore } from '../data/stores';
import ListItem from './ListItem';

function SearchFormResults() {
	const searchInput = useListSearchStore((store) => store.searchInput);

	return <div data-visible={Boolean(searchInput)} className='search-form-results'></div>;
}

export default SearchFormResults;
