import { getFiles } from 'src/utils';
import { create } from 'zustand';
import type { QuizErrorStore, QuizFileStore, QuizRandomIndexStore, QuizSettingsStore } from '../types/base';

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

export const useQuizSettingsStore = create<QuizSettingsStore>()((set) => ({
	isVisible: false,
	toggleVisibility: (condition?: boolean) =>
		set((state) => ({
			isVisible: condition != undefined ? condition : !state.isVisible,
		})),
}));

export const useQuizRandomIndexStore = create<QuizRandomIndexStore>()((set) => ({
	history: [],
	current: undefined,
	preload: [],
	populate: (newIndexArray) => set({ current: newIndexArray[0], preload: [...newIndexArray.slice(1)], history: [] }),
	pushNewIndex: (newIndex) => set((state) => (state.current ? { history: [state.current, ...state.history.slice(0, 4)], current: state.preload[0], preload: [...state.preload.slice(1, 5), newIndex] } : state)),
	shiftIndexes: () => set((state) => (state.history.length > 0 && state.current ? { history: state.history.slice(1), current: state.history[0], preload: [state.current, ...state.preload.slice(0, 4)] } : state)),
	setHistory: (newVal) => set((state) => (typeof newVal === 'function' ? { history: newVal(state.history) } : { history: newVal })),
	setCurrent: (newVal) => set({ current: newVal }),
	setPreload: (newVal) => set((state) => (typeof newVal === 'function' ? { preload: newVal(state.preload) } : { preload: newVal })),
}));
