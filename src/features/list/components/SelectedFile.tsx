import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import ImageFit from 'src/components/ui/ImageFit';
import { useCompletedFilesStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles, isObject, nameFromPath } from 'src/utils';
import '../assets/_SelectedFileComponents.scss';
import '../assets/_SelectedFileLayout.scss';
import { useChosenFileStore } from '../data/stores';
import { useLockSwiping } from '../hooks/useLockSwiping';
import { changeChosenFile } from '../utils/changeChosenFile';

function SelectedFile() {
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const isChosenFileSet = useChosenFileStore((store) => store.isSet);

	// const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);

	const files = getFiles();

	useAddEventListener('keydown', handleKeyDown);
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key == 'ArrowRight') {
			changeChosenFile('right');
		} else if (e.key == 'ArrowLeft') {
			changeChosenFile('left');
		}
	}

	useAddEventListener('custom:swipe', handleSwipe);
	function handleSwipe(e: CustomEvent) {
		let direction = e.detail.direction;
		if (direction == 'left') changeChosenFile('right');
		if (direction == 'right') changeChosenFile('left');
		if (direction == 'down') setChosenFile(undefined);
	}

	// LOCKS MODE CHANGES WHEN IMAGE IS ENLARGED
	useLockSwiping();

	const calcFit = useMemo(() => (file: string) => Math.abs(files.indexOf(file) - files.indexOf(chosenFile!)) <= 1, [chosenFile]);

	return (
		<div data-visible={isChosenFileSet} className='selected-file-container'>
			<div className='selected-file-menu'>
				<button onClick={() => setChosenFile(undefined)}>
					<Icon icon='mdi:arrow-back' />
				</button>
				<p>{files.indexOf(chosenFile!) + 1}</p>
			</div>
			<div className='selected-file-grid'>
				<div>
					<div className='selected-file-slider' style={{ left: `-${files.indexOf(chosenFile!) * 100}%` }}>
						{files
							.filter((f) => !isObject(f))
							.map((file, idx) => {
								return (
									<div key={idx} className='selected-img-container' style={{ left: `${files.indexOf(file) * 100}%` }}>
										<ImageFit src={file.replace(' ', '%20').replace('+', '%2b')} alt={'Chyba v načítání obrázku :('} calcFit={calcFit(file)} />
									</div>
								);
							})}
					</div>
				</div>
				<div className='flex flex-col gap-y-4'>
					<div className='selected-file-name-frame'>
						<button className='selected-file-swapper' onClick={() => changeChosenFile('left')}>
							<Icon icon='mdi:chevron-left' />
						</button>
						<p className='selected-file-name'>{chosenFile && nameFromPath(chosenFile)}</p>
						<button className='selected-file-swapper' onClick={() => changeChosenFile('right')}>
							<Icon icon='mdi:chevron-right' />
						</button>
					</div>
					<div className='selected-file-divider' />
					<div data-success={completedFiles.includes(chosenFile!)} className='selected-file-stat'>
						<p>Naučeno</p>
						<Icon icon={completedFiles.includes(chosenFile!) ? 'mdi:check-circle' : 'mdi:close-circle'} />
					</div>
					{/* {getFolderName(poznavacka!) == 'hmyz' && <p className='text-muted text-lg text-center'>Řád: {getGroupName(files.indexOf(chosenFile!), insectGroupNames)}</p>} */}
				</div>
			</div>
		</div>
	);
}

export default SelectedFile;
