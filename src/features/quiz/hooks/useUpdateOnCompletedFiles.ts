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
}
