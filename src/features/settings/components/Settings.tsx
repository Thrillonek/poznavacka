import { Icon } from '@iconify/react';
import { useEffect, useMemo } from 'react';
import { useSwipeLockStore } from 'src/data';
import { capitalize } from 'src/utils';
import '../assets/_Settings.scss';
import '../assets/_SettingsMobile.scss';
import '../assets/_SettingsPages.scss';

import { useSearchParams } from 'react-router';
import { categories } from '../data/categories';
import SettingsCategories from './SettingsCategories';

export default function Settings() {
	const [searchParams, setSearchParams] = useSearchParams();

	const isSettingsOpen = useMemo(() => searchParams.get('settings') != undefined && !searchParams.get('settings')!.startsWith('z-'), [searchParams]);

	const isContentOpen = useMemo(() => searchParams.get('settings')?.split('-')[0] !== 'x' || false, [searchParams]);
	const settingsMode = useMemo(() => searchParams.get('settings')?.split('-').at(-1) || 'obecné', [searchParams]);

	const lockSwiping = useSwipeLockStore((store) => store.lockSwiping);
	const unlockSwiping = useSwipeLockStore((store) => store.unlockSwiping);

	useEffect(() => {
		if (isSettingsOpen) {
			lockSwiping();
		} else {
			unlockSwiping();
		}
	}, [isSettingsOpen]);

	function closeSettings() {
		setSearchParams((searchParams) => {
			const settings = searchParams.get('settings');
			if (!settings) return searchParams;

			searchParams.set('settings', 'z-' + (settings.startsWith('x-') ? settings.slice(2) : settings));
			return searchParams;
		});
	}

	function closeSettingsCategory() {
		if (isContentOpen) {
			setSearchParams((searchParams) => {
				searchParams.set('settings', 'x-' + searchParams.get('settings'));
				return searchParams;
			});
		}
	}

	return (
		<div onClick={() => closeSettings()} data-open={isSettingsOpen} className='settings-modal'>
			<div data-content-open={isContentOpen} onClick={(e) => e.stopPropagation()} className='settings-container'>
				<div className='settings-status-bar'>
					<button onClick={() => closeSettingsCategory()} className='settings-close settings-back'>
						<Icon icon='mdi:arrow-back' />
					</button>
					<button onClick={() => closeSettings()} className='settings-close'>
						<Icon icon='mdi:close' />
					</button>
					<h3>{capitalize(isContentOpen ? settingsMode : 'Nastavení')}</h3>
				</div>
				<button onClick={() => closeSettings()} className='max-md:hidden settings-close'>
					<Icon icon='mdi:close' />
				</button>
				<div className='settings-categories'>
					<SettingsCategories />
				</div>
				<div className='settings-content'>
					<div>
						<h1 className='settings-page-header'>{capitalize(settingsMode)}</h1>

						{Object.keys(categories).map((category) => {
							const Component = categories[category as keyof typeof categories].component;

							if (settingsMode == category || (settingsMode == null && category == 'obecné')) return <Component key={category} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
