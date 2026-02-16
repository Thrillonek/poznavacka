import { Icon } from '@iconify/react';
import { usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import '../assets/_PathViewer.scss';
import { useFileSystemStore, usePathViewerStore } from '../data/stores';
import { fileSystemGoBack } from '../utils/fileSystemGoBack';

function PathViewer() {
	const path = useFileSystemStore((store) => store.path);
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const isPVOpened = usePathViewerStore((store) => store.isOpened);
	const closePV = usePathViewerStore((store) => store.close);

	function goToFolder(folderName: string) {
		fileSystemGoBack(false, folderName);
		closePV();
	}

	return (
		<div className={'path-viewer-container ' + (isPVOpened ? '' : 'hide')}>
			<div className='path-viewer'>
				<div>
					<div>
						<button onClick={() => goToFolder('0')} className='path-folder'>
							Poznávačky
						</button>
						{path.map((item, idx) => (
							<button className='path-folder' key={idx} onClick={() => goToFolder(item)}>
								<span style={{ marginLeft: `${idx + 1}rem` }}>{capitalize(item)}</span>
							</button>
						))}
						{poznavacka && getContent(poznavacka).some((f: Folder | string) => !isObject(f)) && (
							<div className='path-folder path-file'>
								<span style={{ marginLeft: `${path.length + 1}rem` }}>{capitalize(getFolderName(poznavacka!))}</span>
							</div>
						)}
					</div>
				</div>
			</div>
			<button onClick={() => closePV()} className='path-viewer-close'>
				<Icon icon='mdi:close' />
			</button>
		</div>
	);
}

export default PathViewer;
