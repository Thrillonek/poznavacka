import { Icon } from '@iconify/react';
import { useEffect, useMemo, useRef, type PointerEvent } from 'react';
import { capitalize } from 'src/utils';
import '../assets/_Settings.scss';
import '../assets/_SettingsMobile.scss';
import '../assets/_SettingsPages.scss';

import { useSearchParams } from 'next/navigation';
import { useUpdateSearchParams } from 'src/hooks/useUpdateSearchParams';
import { categories } from '../data/categories';
import SettingsCategories from './SettingsCategories';

export default function Settings() {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();

	const isSettingsOpen = useMemo(() => searchParams.get('settings') != undefined && !searchParams.get('settings')!.startsWith('z-'), [searchParams]);

	const isContentOpen = useMemo(() => searchParams.get('settings')?.search(/[xz]-/) === -1 || false, [searchParams]);
	const settingsMode = useMemo(() => searchParams.get('settings')?.split('-').at(-1) || 'kvíz', [searchParams]);

	const clickedOutsideModalRef = useRef<boolean>();
	const isDevelopmentServer = useRef(false);

	useEffect(() => {
		isDevelopmentServer.current = window.location.hostname === 'poznavacka-test.netlify.app';
	}, []);

	function closeSettings() {
		let settings = searchParams.get('settings');
		if (settings) updateSearchParams({ settings: 'z-' + (settings.startsWith('x-') ? settings.slice(2) : settings) });
	}

	function closeSettingsCategory() {
		if (isContentOpen) {
			updateSearchParams({ settings: 'x-' + searchParams.get('settings') });
		}
	}

	const closeModalProps = {
		onPointerDown: (e: PointerEvent) => e.target === e.currentTarget && (clickedOutsideModalRef.current = true),
		onPointerUp: (e: PointerEvent) => e.target === e.currentTarget && clickedOutsideModalRef.current && closeSettings(),
	};

	return (
		<div {...closeModalProps} data-open={isSettingsOpen} className='settings-modal'>
			<div data-content-open={isContentOpen} className='settings-container'>
				<div className='settings-status-bar'>
					<button onClick={() => closeSettingsCategory()} className='settings-close settings-back'>
						<Icon icon='mdi:arrow-back' />
					</button>
					<button onClick={() => closeSettings()} className='settings-close'>
						<Icon icon='mdi:close' />
					</button>
					<h3>{capitalize(isContentOpen ? settingsMode : 'Více')}</h3>
				</div>
				<button onClick={() => closeSettings()} className='max-md:hidden settings-close'>
					<Icon icon='mdi:close' />
				</button>
				<div className='settings-categories'>
					<div className='flex flex-col gap-4 overflow-y-auto'>
						<SettingsCategories />
					</div>
					{isDevelopmentServer.current ? (
						<a href='https://poznavacka.netlify.app' className='text-muted text-sm text-center underline'>
							Odkaz na stabilní verzi
						</a>
					) : (
						<a href='https://poznavacka-test.netlify.app' className='text-muted text-sm text-center underline'>
							Odkaz na nejnovější (beta) verzi
						</a>
					)}
				</div>
				<div className='settings-content'>
					<div>
						<h1 className='settings-page-header'>{capitalize(settingsMode)}</h1>

						{Object.entries(categories).map(([category, content]) => {
							const Component = content.component;

							if (settingsMode === category || (settingsMode == null && category == 'kvíz')) return <Component key={category} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
