import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import 'src/assets/_ModeMenu.scss';
import { useModeStore, usePoznavackaStore } from 'src/data/stores';
import { getFiles } from 'src/utils';

function ModeMenu() {
	const { mode, setMode } = useModeStore((store) => store);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka!);

	const files = useMemo(() => poznavacka && getFiles(), [poznavacka]);

	return (
		<div className={'shadow-base mode-menu' + (files?.length == 0 ? ' disabled' : '')}>
			<button onClick={() => setMode('quiz')} className={mode == 'quiz' ? 'active' : ''}>
				<Icon icon='mdi:brain' />
			</button>
			<button onClick={() => setMode('list')} className={mode == 'list' ? 'active' : ''}>
				<Icon icon='mdi:format-list-bulleted-square' />
			</button>
			<button data-settings onClick={() => setMode('settings')} className={mode == 'settings' ? 'active' : ''}>
				<Icon icon='mdi:gear' />
			</button>
		</div>
	);
}

export default ModeMenu;
