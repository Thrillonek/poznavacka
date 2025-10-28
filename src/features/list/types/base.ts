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
	setSearchInput: (input: string) => void;
};
