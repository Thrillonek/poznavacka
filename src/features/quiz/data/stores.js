import { getFiles } from 'src/utils';
import { create } from 'zustand';

export const useQuizErrorStore = create((set) => ({
	error: null,
	setError: (error) => set({ error }),
}));

export const useQuizFileStore = create((set) => ({
	fileIndex: null,
	fileName: null,
	isFileLoaded: false,
	isFileNameRevealed: false,
	setFileIndex: (fileIndex) => {
		const files = getFiles();
		set({ fileIndex, isFileLoaded: false, fileName: files[fileIndex - 1] });
	},
	completeFileLoading: () => set({ isFileLoaded: true }),
	toggleFileNameRevealed: (condition) => {
		if (condition != undefined) return set({ isFileNameRevealed: condition });
		set((state) => ({ isFileNameRevealed: !state.isFileNameRevealed }));
	},
}));
