import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils/getFiles';
import { useQuizFileStore } from '../data/stores';
import { fileIndexList } from '../data/variables';
import { changeImage } from '../utils';

export function useUpdateOnCompletedFiles() {
	const quizVisibleFile = useQuizFileStore((state) => state.fileName);

	useAddEventListener(
		'custom:completedFilesChange',
		(e) => {
			const { file, isCompleted }: { file: string; isCompleted: boolean } = e.detail;
			const files = getFiles();

			if (isCompleted) {
				Object.keys(fileIndexList).forEach((k) => {
					let key = k as keyof typeof fileIndexList;

					if (fileIndexList[key].some((item) => files[item - 1] == file)) {
						fileIndexList[key] = fileIndexList[key].filter((item) => files[item - 1] != file);
					}
				});
			} else {
				fileIndexList['main'] = [...fileIndexList['main'], files.indexOf(file) + 1].sort((a, b) => a - b);
			}

			if (quizVisibleFile === file) {
				changeImage({ complete: true });
			}
		},
		[quizVisibleFile],
	);
}
