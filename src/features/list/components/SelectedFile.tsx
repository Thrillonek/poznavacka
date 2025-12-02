import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import ImageFit from 'src/components/ui/ImageFit';
import { insectGroupNames, useMenuElementStore, usePoznavackaStore, useSwipeLockStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles, getFolderName, getGroupName, isObject, nameFromPath } from 'src/utils';
import '../assets/_SelectedFileComponents.scss';
import '../assets/_SelectedFileLayout.scss';
import { useChosenFileStore } from '../data/stores';
import { changeChosenFile } from '../utils/changeChosenFile';

function SelectedFile() {
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const isChosenFileSet = useChosenFileStore((store) => store.isSet);

	const unlockSwiping = useSwipeLockStore((store) => store.unlockSwiping);
	const lockSwiping = useSwipeLockStore((store) => store.lockSwiping);

	const toggleHideMenu = useMenuElementStore((store) => store.toggleHideMenu);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

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
	useEffect(() => {
		if (isChosenFileSet) {
			if (window.innerWidth < 1024) toggleHideMenu(true);
			lockSwiping();
		} else {
			unlockSwiping();
			toggleHideMenu(false);
		}
	}, [isChosenFileSet]);

	if (!isChosenFileSet) return null;
	return (
		<div className='selected-file-container'>
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
										<ImageFit src={file.replace(' ', '%20').replace('+', '%2b')} alt={'Zvětšený obrázek číslo ' + idx} />
									</div>
								);
							})}
					</div>
				</div>
				<div>
					<div className='selected-file-name-frame'>
						<button className='selected-file-swapper' onClick={() => changeChosenFile('left')}>
							<Icon icon='mdi:chevron-left' />
						</button>
						<p className='selected-file-name'>{chosenFile && nameFromPath(chosenFile)}</p>
						<button className='selected-file-swapper' onClick={() => changeChosenFile('right')}>
							<Icon icon='mdi:chevron-right' />
						</button>
					</div>
					{getFolderName(poznavacka!) == 'hmyz' && <p className='text-muted text-lg text-center'>Řád: {getGroupName(files.indexOf(chosenFile!), insectGroupNames)}</p>}
				</div>
			</div>
		</div>
	);
}

export default SelectedFile;
