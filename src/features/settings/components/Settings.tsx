import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useModeStore, useSwipeLockStore } from 'src/data';
import { capitalize } from 'src/utils';
import '../assets/_Settings.scss';
import '../assets/_SettingsMobile.scss';
import '../assets/_SettingsPages.scss';
import { useSettingsModeStore } from '../data/stores';
import ColorPickerSettings from './pages/ColorPickerSettings';
import GeneralSettings from './pages/GeneralSettings';
import KeybindsSettings from './pages/KeybindsSettings';
import ListSettings from './pages/ListSettings';
import QuizSettings from './pages/QuizSettings';
import SettingsCategories from './SettingsCategories';

export default function Settings() {
	const isSettingsOpen = useModeStore((store) => store.isSettingsOpen);
	const closeSettings = useModeStore((store) => store.closeSettings);

	const settingsMode = useSettingsModeStore((store) => store.mode);
	const isContentOpen = useSettingsModeStore((store) => store.isContentOpen);
	const toggleContent = useSettingsModeStore((store) => store.toggleContent);

	const lockSwiping = useSwipeLockStore((store) => store.lockSwiping);
	const unlockSwiping = useSwipeLockStore((store) => store.unlockSwiping);

	useEffect(() => {
		if (isSettingsOpen) {
			lockSwiping();
		} else {
			unlockSwiping();
		}
	}, [isSettingsOpen]);

	return (
		<div onClick={() => closeSettings()} data-open={isSettingsOpen} className='settings-modal'>
			<div data-content-open={isContentOpen} onClick={(e) => e.stopPropagation()} className='settings-container'>
				<div className='settings-status-bar'>
					<button onClick={() => toggleContent(false)} className='settings-close settings-back'>
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
						{settingsMode == 'obecné' && <GeneralSettings />}
						{settingsMode == 'kvíz' && <QuizSettings />}
						{settingsMode == 'seznam' && <ListSettings />}
						{settingsMode == 'klávesové zkratky' && <KeybindsSettings />}
						{settingsMode == 'vzhled' && <ColorPickerSettings />}
					</div>
				</div>
			</div>
		</div>
	);
}
