import { Icon } from '@iconify/react';
import { useMemo } from 'react';
import 'src/assets/_ModeMenu.scss';
import { useModeStore, usePoznavackaStore } from 'src/data/stores';
import { getFiles } from 'src/utils';

function ModeMenu() {
	const mode = useModeStore((store) => store.mode);
	const setMode = useModeStore((store) => store.setMode);
	const isSettingsOpen = useModeStore((store) => store.isSettingsOpen);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka!);

	const files = useMemo(() => poznavacka && getFiles(), [poznavacka]);

	return (
		<div className={'shadow-base mode-menu' + (!files || files.length == 0 ? ' disabled' : '')}>
			<button onClick={() => setMode('quiz')} className={mode == 'quiz' && !isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:brain' />
				<span>Kvíz</span>
			</button>
			<button onClick={() => setMode('list')} className={mode == 'list' && !isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:format-list-bulleted-square' />
				<span>Seznam</span>
			</button>
			<button data-settings onClick={() => setMode('settings')} className={isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:gear' />
				<span>Nastavení</span>
			</button>
		</div>
	);
}

export default ModeMenu;
