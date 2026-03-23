import { Icon } from '@iconify/react';
import SwitchInput from 'src/components/form/SwitchInput';
import ImageFit from 'src/components/ui/ImageFit';
import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles, getKeyByValue, nameFromPath } from 'src/utils';
import '../assets/_SelectedFileComponents.scss';
import '../assets/_SelectedFileLayout.scss';
import { useChosenFileStore, useListFilesStore } from '../data/stores';
import { useLockSwiping } from '../hooks/useLockSwiping';
import { changeChosenFile } from '../utils/changeChosenFile';

function SelectedFile() {
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const isChosenFileSet = useChosenFileStore((store) => store.isSet);

	// const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const addFileToCompleted = useCompletedFilesStore((store) => store.addFileToCompleted);
	const removeFileFromCompleted = useCompletedFilesStore((store) => store.removeFileFromCompleted);

	const listFiles = useListFilesStore((store) => store.files);

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

	const isChosenFileDefined = typeof chosenFile == 'string';

	function toggleCompletedFile() {
		const isCompleted = completedFiles.includes(chosenFile!);
		if (isCompleted) {
			removeFileFromCompleted(chosenFile!);
		} else {
			addFileToCompleted(chosenFile!);
		}
	}

	const files = getFiles();

	function getItemAt(array: any[], index: number) {
		if (index < array.length) {
			return array.at(index);
		} else return array[index % array.length];
	}

	return (
		<div data-visible={isChosenFileSet} className='selected-file-container'>
			<div className='selected-file-menu'>
				<button onClick={() => setChosenFile(undefined)}>
					<Icon icon='mdi:arrow-back' />
				</button>
				{isChosenFileDefined && <p>{parseInt(getKeyByValue(listFiles, chosenFile) as string) + 1}</p>}
			</div>
			<div className='selected-file-grid'>
				<div>
					<div id='selected-file-carousel' className='selected-file-slider'>
						<div className='opacity-0 scale-90 -translate-x-20'>
							<ImageFit
								src={getItemAt(files, files.indexOf(chosenFile!) - 1)
									.replace(' ', '%20')
									.replace('+', '%2b')}
								important
								alt={'Chyba v načítání obrázku :('}
							/>
						</div>
						<div className='z-10'>
							<ImageFit src={chosenFile!.replace(' ', '%20').replace('+', '%2b')} important alt={'Chyba v načítání obrázku :('} />
						</div>
						<div className='opacity-0 scale-90 translate-x-20'>
							<ImageFit
								src={getItemAt(files, files.indexOf(chosenFile!) + 1)
									.replace(' ', '%20')
									.replace('+', '%2b')}
								important
								alt={'Chyba v načítání obrázku :('}
							/>
						</div>
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
					<SwitchInput title='Naučeno' description='Obrázky označené jako naučené se nebudou ukazovat ve kvízu' active={completedFiles.includes(chosenFile!)} onToggle={toggleCompletedFile} />
					<SwitchInput title='Zapnout animace' description='Zapnout animaci při měnění obrázků' active={settings.list.showSelectedFileAnimations} onToggle={() => updateSettings('list', 'showSelectedFileAnimations', !settings.list.showSelectedFileAnimations)} />
					{/* {getFolderName(poznavacka!) == 'hmyz' && <p className='text-muted text-lg text-center'>Řád: {getGroupName(files.indexOf(chosenFile!), insectGroupNames)}</p>} */}
				</div>
			</div>
		</div>
	);
}

export default SelectedFile;
