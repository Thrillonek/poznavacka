export type ListItemProps = {
	idx: number;
	file: string;
};

export type ChosenFileStore = {
	chosenFile?: string;
	isSet: boolean;
	setChosenFile: (file?: string) => void;
};

export type ListSearchStore = {
	searchInput: string;
	searchedItem?: string;
	isSearchInputFocused: boolean;
	setSearchInput: (input: string) => void;
	setSearchedItem: (item: string) => void;
	setIsSearchInputFocused: (condition: boolean) => void;
};
