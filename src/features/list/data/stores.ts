import { create } from 'zustand';
import type { ChosenFileStore, ListSearchStore } from '../types/base';

export const useChosenFileStore = create<ChosenFileStore>()((set) => ({
	chosenFile: undefined,
	isSet: false,
	setChosenFile: (file) => set({ chosenFile: file, isSet: file != null }),
}));

export const useListSearchStore = create<ListSearchStore>()((set) => ({
	searchInput: '',
	searchedItem: '',
	isSearchInputFocused: false,
	setSearchInput: (input) => set({ searchInput: input }),
	setSearchedItem: (item) => set({ searchedItem: item }),
	setIsSearchInputFocused: (condition) => set({ isSearchInputFocused: condition }),
}));
