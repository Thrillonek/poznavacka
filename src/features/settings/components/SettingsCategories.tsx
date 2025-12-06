import { useMemo } from 'react';
import { capitalize } from 'src/utils';
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

	function SettingsCategory({ mode }: { mode: string }) {
		return <button {...btnProps(mode)}>{capitalize(mode)}</button>;
	}

	return (
		<>
			<h1 className='settings-header'>Nastavení</h1>
			<SettingsCategory mode='obecné' />
			<SettingsCategory mode='kvíz' />
			<SettingsCategory mode='seznam' />
			<SettingsCategory mode='klávesové zkratky' />
		</>
	);
}
