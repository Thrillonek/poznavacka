import imageRefreshIcon from '@iconify-icons/mdi';
import { Icon } from '@iconify/react';
import { useCallback, useMemo } from 'react';
import SwitchInput from 'src/components/form/SwitchInput';
import ImageFit from 'src/components/ui/ImageFit';
import { useCompletedFilesStore, useSettingsStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles, getKeyByValue, nameFromPath } from 'src/utils';
import { shuffleArray } from 'src/utils/general/shuffleArray';
import '../assets/_SelectedFileComponents.scss';
import '../assets/_SelectedFileLayout.scss';
import { useHiddenNameStore, useListFilesStore, useSelectedFileStore } from '../data/stores';
import { syncListFiles } from '../hooks/useSyncListFiles';
import { changeSelectedFile } from '../utils/changeSelectedFile';
import { shuffleListFiles } from '../utils/shuffleListFiles';

function handleKeyDown(e: KeyboardEvent) {
	if (e.key == 'ArrowRight') {
		changeSelectedFile('right');
	} else if (e.key == 'ArrowLeft') {
		changeSelectedFile('left');
	}
}

function getItemAt(array: any[], index: number) {
	if (index < array.length) {
		return array.at(index);
	} else return array[index % array.length];
}

function handleSwipe(e: CustomEvent) {
	let direction = e.detail.direction;
	if (direction == 'left') changeSelectedFile('right');
	if (direction == 'right') changeSelectedFile('left');
}

function SelectedFile() {
	const selectedFile = useSelectedFileStore((store) => store.selectedFile) as string;
	const hideSelectedFile = useSelectedFileStore((store) => store.hideSelectedFile);
	const isSelectedFileSet = useSelectedFileStore((store) => store.isShown);

	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	const completedFiles = useCompletedFilesStore((store) => store.completedFiles);
	const addFileToCompleted = useCompletedFilesStore((store) => store.addFileToCompleted);
	const removeFileFromCompleted = useCompletedFilesStore((store) => store.removeFileFromCompleted);

	const listFiles = useListFilesStore((store) => store.files);

	const isHiddenFileNames = useHiddenNameStore((store) => store.isHidden);
	const toggleHiddenFileNames = useHiddenNameStore((store) => store.toggleHidden);

	const toggleCompletedFile = useCallback(() => {
		if (!selectedFile) return;
		const isCompleted = completedFiles.includes(selectedFile);
		if (isCompleted) {
			removeFileFromCompleted(selectedFile);
		} else {
			addFileToCompleted(selectedFile);
		}
		sessionStorage.setItem('quiz-queue-reset', 'true');
	}, [completedFiles, selectedFile, removeFileFromCompleted, addFileToCompleted]);

	useAddEventListener('keydown', handleKeyDown);
	useAddEventListener('custom:swipe', handleSwipe);

	const files = getFiles();

	const prevImage = useMemo(() => getItemAt(files, files.indexOf(selectedFile) - 1).replaceAll(/\+/g, '%2B'), [files, selectedFile]);
	const currentImage = useMemo(() => selectedFile.replaceAll(/\+/g, '%2B'), [selectedFile]);
	const nextImage = useMemo(() => getItemAt(files, files.indexOf(selectedFile) + 1).replaceAll(/\+/g, '%2B'), [files, selectedFile]);

	return (
		<div data-visible={isSelectedFileSet} className='selected-file-container'>
			<div className='flex flex-col gap-y-4 bg-base p-4 rounded-lg w-full h-[max(67%,20rem)]'>
				<div className='selected-file-menu'>
					{isSelectedFileSet && <p>{!isHiddenFileNames ? parseInt(getKeyByValue(Object.fromEntries(listFiles), selectedFile) ?? '?') + 1 : '?'}</p>}
					<button onClick={() => hideSelectedFile()}>
						<Icon icon='mdi:close' />
					</button>
				</div>

				<div id='selected-file-carousel' className='selected-file-slider'>
					<div className='opacity-0 scale-90 -translate-x-20'>
						<ImageFit src={prevImage!} important alt={'Zvětšený obrázek'} />
					</div>
					<div className='z-10'>
						<ImageFit src={currentImage!} important alt={'Zvětšený obrázek'} />
					</div>
					<div className='opacity-0 scale-90 translate-x-20'>
						<ImageFit src={nextImage!} important alt={'Zvětšený obrázek'} />
					</div>
				</div>

				<div className='selected-file-name-frame'>
					<button className='selected-file-swapper' onClick={() => changeSelectedFile('left')}>
						<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
							<path fill='currentColor' d='M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z'></path>
						</svg>
					</button>
					{<p className='selected-file-name'>{!isHiddenFileNames ? selectedFile && nameFromPath(selectedFile) : '???'}</p>}
					<button className='selected-file-swapper' onClick={() => changeSelectedFile('right')}>
						<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
							<path fill='currentColor' d='M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z'></path>
						</svg>
					</button>
				</div>
			</div>
			<div className='flex flex-col gap-y-2'>
				<SwitchInput title='Naučeno' description='Obrázky označené jako naučené se nebudou ukazovat ve kvízu' active={!!selectedFile && completedFiles.includes(selectedFile)} onToggle={toggleCompletedFile} activeColor='#059000' />
			</div>
			<div className='flex flex-col gap-y-2'>
				<SwitchInput title='Zapnout animace' description='Zapnout animaci při měnění obrázků' active={settings.list.showSelectedFileAnimations} onToggle={() => updateSettings('list', 'showSelectedFileAnimations', !settings.list.showSelectedFileAnimations)} />
				<SwitchInput title='Skrýt názvy obrázků' active={isHiddenFileNames} onToggle={() => toggleHiddenFileNames()} />
			</div>
			<div className='flex gap-2'>
				<button onClick={() => shuffleListFiles()} className='bg-base-hover text-main btn'>
					<Icon icon='mdi:image-multiple'></Icon>
					<span>Zamíchat obrázky</span>
				</button>
				<button onClick={() => syncListFiles(files)} className='bg-base-hover text-main btn'>
					<Icon icon='mdi:image-sync'></Icon>
					<span>Vrátit původní pořadí obrázků</span>
				</button>
			</div>
		</div>
	);
}

export default SelectedFile;
