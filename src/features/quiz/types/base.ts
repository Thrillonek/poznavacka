export type QuizErrorStore = {
	error?: string;
	setError: (error: string) => void;
};

export type QuizFileStore = {
	fileIndex?: number;
	fileName?: string;
	isFileLoaded: boolean;
	isFileNameRevealed: boolean;
	setFileIndex: (fileIndex: number) => void;
	completeFileLoading: () => void;
	toggleFileNameRevealed: (condition?: boolean) => void;
};

export type QuizSettingsStore = {
	isVisible: boolean;
	toggleVisibility: (condition?: boolean) => void;
};

export type QuizRandomIndexStore = {
	history: number[];
	current: number | undefined;
	preload: number[];
	populate: (newIndexArray: number[]) => void;
	pushNewIndex: (newIndex: number) => void;
	shiftIndexes: () => void;
	setHistory: (x: number[] | ((x: number[]) => number[])) => void;
	setCurrent: (x?: number) => void;
	setPreload: (x: number[] | ((x: number[]) => number[])) => void;
};
