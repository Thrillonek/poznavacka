import { useMemo } from 'react';
import '../assets/_SettingsCategories.scss';
import { useSettingsModeStore } from '../data/stores';

export default function SettingsCategories() {
	const { mode: currentMode, setMode } = useSettingsModeStore((store) => store);

	const btnProps = useMemo(
		() => (mode: string) => {
			return {
				'data-active': currentMode == mode,
				className: 'settings-category',
				onClick: () => setMode(mode),
			};
		},
		[currentMode]
	);

	return (
		<>
			<h1 className='settings-header'>Nastavení</h1>
			<button {...btnProps('general')}>Obecné</button>
			<button {...btnProps('quiz')}>Kvíz</button>
			<button {...btnProps('list')}>Seznam</button>
			<button {...btnProps('keybinds')}>Klávesové zkratky</button>
		</>
	);
}
