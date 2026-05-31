import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import SwitchInput from 'src/components/form/SwitchInput';
import ImageFit from 'src/components/ui/ImageFit';
import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles, getKeyByValue, nameFromPath } from 'src/utils';
import '../assets/_SelectedFileComponents.scss';
import '../assets/_SelectedFileLayout.scss';
import { useListFilesStore, useSelectedFileStore } from '../data/stores';
import { changeSelectedFile } from '../utils/changeSelectedFile';

function SelectedFile() {
	const selectedFile = useSelectedFileStore((store) => store.selectedFile);
	const setSelectedFile = useSelectedFileStore((store) => store.setSelectedFile);
	const isSelectedFileSet = useSelectedFileStore((store) => store.isSet);

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
			changeSelectedFile('right');
		} else if (e.key == 'ArrowLeft') {
			changeSelectedFile('left');
		}
	}

	useAddEventListener('custom:swipe', handleSwipe);
	function handleSwipe(e: CustomEvent) {
		let direction = e.detail.direction;
		if (direction == 'left') changeSelectedFile('right');
		if (direction == 'right') changeSelectedFile('left');
	}

	const isSelectedFileDefined = typeof selectedFile == 'string';

	function toggleCompletedFile() {
		const isCompleted = completedFiles.includes(selectedFile!);
		if (isCompleted) {
			removeFileFromCompleted(selectedFile!);
		} else {
			addFileToCompleted(selectedFile!);
		}
		const event = new CustomEvent('custom:completedFilesChange', { detail: { file: selectedFile, isCompleted: !isCompleted } });
		document.dispatchEvent(event);
	}

	const files = getFiles();

	function getItemAt(array: any[], index: number) {
		if (index < array.length) {
			return array.at(index);
		} else return array[index % array.length];
	}

	const prevImage = useMemo(() => getItemAt(files, files.indexOf(selectedFile!) - 1).replaceAll(/\+/g, '%2B'), [files, selectedFile]);
	const currentImage = useMemo(() => selectedFile!.replaceAll(/\+/g, '%2B'), [selectedFile]);
	const nextImage = useMemo(() => getItemAt(files, files.indexOf(selectedFile!) + 1).replaceAll(/\+/g, '%2B'), [files, selectedFile]);

	return (
		<div data-visible={isSelectedFileSet} className='selected-file-container'>
			<div className='selected-file-menu'>
				{isSelectedFileDefined && <p>{parseInt(getKeyByValue(listFiles, selectedFile) as string) + 1}</p>}
				<button onClick={() => setSelectedFile(undefined)}>
					<Icon icon='mdi:close' />
				</button>
			</div>
			<div className='selected-file-grid min-h-0'>
				<div>
					<div id='selected-file-carousel' className='selected-file-slider'>
						<div className='opacity-0 scale-90 -translate-x-20'>
							<ImageFit src={prevImage} important alt={'Zvětšený obrázek'} />
						</div>
						<div className='z-10'>
							<ImageFit calcFit src={currentImage} important alt={'Zvětšený obrázek'} />
						</div>
						<div className='opacity-0 scale-90 translate-x-20'>
							<ImageFit src={nextImage} important alt={'Zvětšený obrázek'} />
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-y-4 overflow-auto'>
					<div className='selected-file-name-frame'>
						<button className='selected-file-swapper' onClick={() => changeSelectedFile('left')}>
							<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
								<path fill='currentColor' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z'></path>
							</svg>
						</button>
						<p className='selected-file-name'>{selectedFile && nameFromPath(selectedFile)}</p>
						<button className='selected-file-swapper' onClick={() => changeSelectedFile('right')}>
							<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
								<path fill='currentColor' d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z'></path>
							</svg>
						</button>
					</div>
					<div className='selected-file-divider' />
					<div className='flex flex-col gap-4 grow'>
						<SwitchInput title='Naučeno' description='Obrázky označené jako naučené se nebudou ukazovat ve kvízu' active={completedFiles.includes(selectedFile!)} onToggle={toggleCompletedFile} />
						<SwitchInput title='Zapnout animace' description='Zapnout animaci při měnění obrázků' active={settings.list.showSelectedFileAnimations} onToggle={() => updateSettings('list', 'showSelectedFileAnimations', !settings.list.showSelectedFileAnimations)} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default SelectedFile;
