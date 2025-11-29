import { insectGroupNames, usePoznavackaStore, useSettingsStore } from 'src/data';
import { getGroupName, nameFromPath, objFirstKey } from 'src/utils';
import { useQuizErrorStore, useQuizFileStore } from '../data/stores';

function QuizImageViewer() {
	const settings = useSettingsStore((store) => store.settings);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { fileIndex, fileName, isFileLoaded, isFileNameRevealed, completeFileLoading } = useQuizFileStore((store) => store);
	const error = useQuizErrorStore((store) => store.error);

	return (
		<>
			<div className='flex justify-center row-span-4 w-full'>
				<img onLoad={completeFileLoading} className='rounded max-w-full h-full max-h-full object-contain overflow-hidden' src={fileName!.replace(' ', '%20').replace('+', '%2b')} />
			</div>
			<div className='row-span-1 mt-auto h-20'>
				<div className={error ? 'text-red-400 text-lg' : 'text-white text-center font-semibold text-2xl'}>
					{error ? (
						error
					) : !isFileLoaded ? (
						'Načítání...'
					) : isFileNameRevealed ? (
						<>
							{nameFromPath(fileName!)}
							{objFirstKey(poznavacka!) == 'hmyz' && (
								<>
									<br />
									<p className='font-normal text-lg'>Řád: {getGroupName(fileIndex! - 1, insectGroupNames)}</p>
								</>
							)}
						</>
					) : (
						settings.devMode && fileIndex
					)}
				</div>
			</div>
		</>
	);
}

export default QuizImageViewer;
