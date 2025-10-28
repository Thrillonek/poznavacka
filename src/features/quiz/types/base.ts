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
