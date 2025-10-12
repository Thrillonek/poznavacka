import { create } from 'zustand';

export const useChosenFileStore = create((set) => ({
	chosenFile: null,
	isSet: false,
	setChosenFile: (file) => set({ chosenFile: file, isSet: file != null }),
}));

export const useListSearchStore = create((set) => ({
	searchInput: '',
	setSearchInput: (input) => set({ searchInput: input }),
}));
