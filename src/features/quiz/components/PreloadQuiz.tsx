import { useEffect, useState } from 'react';
import PreloadImages from 'src/components/ui/PreloadImages';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { useQuizFileStore, useQuizRandomIndexStore } from '../data/stores';
import { fileIndexList } from '../data/variables';

const files = getFiles();

export default function PreloadQuiz() {
	const settings = useSettingsStore((store) => store.settings);
	const fileIndex = useQuizFileStore((store) => store.fileIndex);
	const storedPreloadedImages = useQuizRandomIndexStore((store) => store.preload);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const [preloadedImages, setPreloadedImages] = useState<string[]>([]);

	useEffect(() => {
		setPreloadedImages([]);
		if (fileIndex) {
			if (settings.quiz.random) {
				setPreloadedImages(storedPreloadedImages.map((i) => files[i - 1]));
			} else {
				for (let i = 1; i <= 5; i++) {
					setPreloadedImages((prev) => [...prev, files[((fileIndex + i) % fileIndexList.main.length) - 1]]);
				}
			}
		}
	}, [settings.quiz.random, fileIndex, poznavacka]);

	return (
		<>
			<PreloadImages srcArray={preloadedImages} />
		</>
	);
}
