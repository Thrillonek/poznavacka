import { getFiles } from 'src/utils';
import { create } from 'zustand';
import type { ListFilesStore, ListSearchStore, SelectedFileStore } from '../types/base';

export const useSelectedFileStore = create<SelectedFileStore>()((set) => ({
	selectedFile: undefined,
	isSet: false,
	setSelectedFile: (file) => set({ selectedFile: file, isSet: file != null }),
}));

export const useListSearchStore = create<ListSearchStore>()((set) => ({
	searchInput: '',
	isSearchInputFocused: false,
	setSearchInput: (input) => set({ searchInput: input }),
	setIsSearchInputFocused: (condition) => set({ isSearchInputFocused: condition }),
}));

export const useListFilesStore = create<ListFilesStore>()((set) => ({
	files: Object.assign({}, getFiles()),
	setFiles: (newFiles) => set({ files: newFiles }),
}));
