import { create } from 'zustand';

export const useChosenFileStore = create((set) => ({
	chosenFile: null,
	setChosenFile: (file) => set({ chosenFile: file }),
}));
