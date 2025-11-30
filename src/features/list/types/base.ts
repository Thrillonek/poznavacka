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
	isSearchInputFocused: boolean;
	setSearchInput: (input: string) => void;
	setIsSearchInputFocused: (input: boolean) => void;
};
