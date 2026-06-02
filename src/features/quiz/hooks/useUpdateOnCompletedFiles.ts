import { completeSoftNavigation } from 'next/dist/client/components/segment-cache/navigation';
import { useEffect } from 'react';
import { useCompletedFilesStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils/getFiles';
import { useQuizFileStore, useQuizRandomIndexStore } from '../data/stores';
import { fileIndexList } from '../data/variables';
import { changeImage } from '../utils';

export function useUpdateOnCompletedFiles() {
	const quizVisibleFile = useQuizFileStore((state) => state.fileName);

	const quizHistory = useQuizRandomIndexStore((state) => state.history);
	const preload = useQuizRandomIndexStore((state) => state.preload);
	const setQuizHistory = useQuizRandomIndexStore((state) => state.setHistory);
	const setPreload = useQuizRandomIndexStore((state) => state.setPreload);
	const completedFiles = useCompletedFilesStore((state) => state.completedFiles);

	const files = getFiles();

	useAddEventListener(
		'custom:completedFilesChange',
		(e) => {
			const { file, isCompleted }: { file: string; isCompleted: boolean } = e.detail;

			if (isCompleted) {
				Object.keys(fileIndexList).forEach((k) => {
					let key = k as keyof typeof fileIndexList;

					if (fileIndexList[key].some((item) => item && files[item - 1] == file)) {
						fileIndexList[key] = fileIndexList[key].map((item) => (!item || files[item - 1] != file ? item : null));
					}
				});
			} else {
				fileIndexList['main'][fileIndexList['main'].indexOf(null)] = files.indexOf(file) + 1;
				fileIndexList['main'] = fileIndexList['main'].sort((a, b) => (a != null && b != null ? a - b : 0));
			}

			if (quizVisibleFile === file) {
				changeImage();
			}
		},
		[quizVisibleFile],
	);

	useEffect(() => {
		const completedIndexInHistory = quizHistory.find((x) => completedFiles.includes(files[x - 1]));
		const completedIndexInPreload = preload.find((x) => completedFiles.includes(files[x - 1]));
		if (completedIndexInHistory) {
			setQuizHistory((prev) => prev.filter((x) => x !== completedIndexInHistory));
		}
		if (completedIndexInPreload) {
			setPreload((prev) => prev.filter((x) => x !== completedIndexInPreload));
		}
	}, [quizHistory, preload, completedFiles]);
}
