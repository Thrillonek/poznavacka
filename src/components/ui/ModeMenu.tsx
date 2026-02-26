import { Icon } from '@iconify/react';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import 'src/assets/_ModeMenu.scss';
import { usePoznavackaStore } from 'src/data/stores';
import type { Modes } from 'src/types/stores';
import { getFiles } from 'src/utils';

function ModeMenu() {
	const [searchParams, setSearchParams] = useSearchParams();

	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);
	const setMode = useCallback((newMode: Modes) => setSearchParams({ ...Object.fromEntries(searchParams.entries()), mode: newMode }), [searchParams]);

	const isSettingsOpen = useMemo(() => searchParams.get('settings') != undefined && !searchParams.get('settings')!.startsWith('z-'), [searchParams]);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka!);

	const files = useMemo(() => poznavacka && getFiles(), [poznavacka]);

	function openSettings() {
		setSearchParams((sparams) => {
			if (!sparams.get('settings')) sparams.set('settings', 'obecné');
			if (sparams.get('settings')?.startsWith('z-')) sparams.set('settings', sparams.get('settings')!.slice(2));
			return sparams;
		});
	}

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
			<button data-settings onClick={() => openSettings()} className={isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:gear' />
				<span>Nastavení</span>
			</button>
		</div>
	);
}

export default ModeMenu;
