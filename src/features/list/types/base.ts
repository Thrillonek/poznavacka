export type ListItemProps = {
	idx: number;
	file: string;
	hideImage?: boolean;
};

export type ChosenFileStore = {
	chosenFile?: string;
	isSet: boolean;
	setChosenFile: (file?: string) => void;
};

export type ListSearchStore = {
	searchInput: string;
	setSearchInput: (input: string) => void;
};
