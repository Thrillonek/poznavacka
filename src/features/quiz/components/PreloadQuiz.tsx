import { useEffect, useState } from 'react';
import PreloadImages from 'src/components/ui/PreloadImages';
import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useQuizFileStore } from '../data/stores';
import { fileIndexList } from '../data/variables';

const files = getFiles();

export default function PreloadQuiz() {
	const settings = useSettingsStore((store) => store.settings);
	const fileIndex = useQuizFileStore((store) => store.fileIndex);

	const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

	useEffect(() => {
		if (fileIndex) {
			if (settings.quiz.random) {
			} else {
				for (let i = 1; i <= 3; i++) {
					setPreloadedImages((prev) => [...prev, files[((fileIndex + i) % fileIndexList.main.length) - 1]]);
				}
			}
		}
	}, [settings.quiz.random, fileIndex]);

	return (
		<>
			<PreloadImages srcArray={preloadedImages} />
		</>
	);
}
