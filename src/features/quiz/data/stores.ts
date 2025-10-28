import { getFiles } from 'src/utils';
import { create } from 'zustand';
import type { QuizErrorStore, QuizFileStore } from '../types/base';

export const useQuizErrorStore = create<QuizErrorStore>()((set) => ({
	error: undefined,
	setError: (error) => set({ error }),
}));

export const useQuizFileStore = create<QuizFileStore>()((set) => ({
	fileIndex: undefined,
	fileName: undefined,
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
