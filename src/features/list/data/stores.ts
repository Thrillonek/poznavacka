import { getFiles } from 'src/utils';
import { create } from 'zustand';
import type { HiddenNameStore, ListFilesStore, ListSearchStore, SelectedFileStore } from '../types/base';

export const useSelectedFileStore = create<SelectedFileStore>()((set) => ({
	selectedFile: undefined,
	isShown: false,
	setSelectedFile: (file) => set({ selectedFile: file, isShown: file != null }),
	hideSelectedFile: () => set({ isShown: false }),
}));

export const useListSearchStore = create<ListSearchStore>()((set) => ({
	searchInput: '',
	isSearchInputFocused: false,
	setSearchInput: (input) => set({ searchInput: input }),
	setIsSearchInputFocused: (condition) => set({ isSearchInputFocused: condition }),
}));

export const useListFilesStore = create<ListFilesStore>()((set) => ({
	files: new Map<number, string>(getFiles().map((file, idx) => [idx, file])),
	setFiles: (newFiles) => set({ files: newFiles }),
}));

export const useHiddenNameStore = create<HiddenNameStore>()((set) => ({
	isHidden: false,
	toggleHidden: (condition) => set((state) => ({ isHidden: condition ?? !state.isHidden })),
}));
