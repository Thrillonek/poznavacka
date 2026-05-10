import { useAddEventListener } from 'src/hooks';
import { getFiles } from 'src/utils/getFiles';
import { fileIndexList } from '../data/variables';

export const useUpdateOnCompletedFiles = () => {
	useAddEventListener('custom:completedFilesChange', (e) => {
		const { file, isCompleted }: { file: string; isCompleted: boolean } = e.detail;
		const files = getFiles();

		Object.keys(fileIndexList).forEach((k) => {
			let key = k as keyof typeof fileIndexList;

			if (fileIndexList[key].some((item) => files[item - 1] == file) && isCompleted) {
				fileIndexList[key] = fileIndexList[key].filter((item) => files[item - 1] != file);
			}
		});
		if (!isCompleted) {
			fileIndexList['main'].push(files.indexOf(file) + 1);
		}
	});
};
