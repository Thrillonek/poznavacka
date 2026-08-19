import { Icon } from '@iconify/react';
import { useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import 'src/assets/_ModeMenu.scss';
import { usePoznavackaStore } from 'src/data/stores';
import { useUpdateSearchParams } from 'src/hooks/useUpdateSearchParams';
import type { Modes } from 'src/types/stores';
import { getFiles } from 'src/utils';

function ModeMenu({ closeMenu }: { closeMenu?: () => void }) {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();

	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);
	const setMode = useCallback((newMode: Modes) => updateSearchParams({ mode: newMode }), [searchParams]);

	const isSettingsOpen = useMemo(() => searchParams.get('settings') != undefined && !searchParams.get('settings')!.startsWith('z-'), [searchParams]);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka!);

	const files = useMemo(() => poznavacka && getFiles(), [poznavacka]);

	function openSettings() {
		if (!searchParams.has('settings')) {
			updateSearchParams({ settings: 'x-kvíz' });
		}
		if (searchParams.get('settings')?.startsWith('z-')) {
			updateSearchParams({ settings: 'x-' + searchParams.get('settings')!.split('-').at(-1) });
		}
	}

	function updateMode(newMode: Modes) {
		setMode(newMode);
		if (closeMenu) closeMenu();
	}

	return (
		<div className={'shadow-base mode-menu' + (!files || files.length == 0 ? ' disabled' : '')}>
			<button onClick={() => updateMode('quiz')} className={mode == 'quiz' && !isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:brain' />
				<span>Kvíz</span>
			</button>
			<button onClick={() => updateMode('list')} className={mode == 'list' && !isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:format-list-bulleted-square' />
				<span>Seznam</span>
			</button>
			<button data-settings onClick={() => openSettings()} className={isSettingsOpen ? 'active' : ''}>
				<Icon icon='mdi:dots-horizontal' />
				<span>Více</span>
			</button>
		</div>
	);
}

export default ModeMenu;
