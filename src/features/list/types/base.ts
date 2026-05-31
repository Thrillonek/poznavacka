export type ListItemProps = {
	idx: number;
	file: string;
};

export type SelectedFileStore = {
	selectedFile?: string;
	isSet: boolean;
	setSelectedFile: (file?: string) => void;
};

export type ListSearchStore = {
	searchInput: string;
	isSearchInputFocused: boolean;
	setSearchInput: (input: string) => void;
	setIsSearchInputFocused: (condition: boolean) => void;
};

export type ListFilesStore = {
	files: Record<number, string>;
	setFiles: (newFiles: Record<number, string>) => void;
};
