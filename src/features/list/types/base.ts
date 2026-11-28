export type ListItemProps = {
	idx: number;
	file: string;
};

export type SelectedFileStore = {
	selectedFile?: string;
	isShown: boolean;
	setSelectedFile: (file?: string) => void;
	hideSelectedFile: () => void;
};

export type ListSearchStore = {
	searchInput: string;
	isSearchInputFocused: boolean;
	setSearchInput: (input: string) => void;
	setIsSearchInputFocused: (condition: boolean) => void;
};

export type ListFilesStore = {
	files: Map<number, string>;
	setFiles: (newFiles: ListFilesStore['files']) => void;
};

export type HiddenNameStore = {
	isHidden: boolean;
	toggleHidden: (condition?: boolean) => void;
};
