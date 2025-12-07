import { useMemo } from 'react';
import { capitalize } from 'src/utils';
import '../assets/_SettingsCategories.scss';
import { useSettingsModeStore } from '../data/stores';
import type { SettingsModes } from '../types/stores';

export default function SettingsCategories() {
	const currentMode = useSettingsModeStore((store) => store.mode);
	const setMode = useSettingsModeStore((store) => store.setMode);

	const btnProps = useMemo(
		() => (mode: SettingsModes) => {
			return {
				'data-active': currentMode == mode,
				className: 'settings-category',
				onClick: () => {
					setMode(mode);
				},
			};
		},
		[currentMode]
	);

	function SettingsCategory({ mode }: { mode: SettingsModes }) {
		return <button {...btnProps(mode)}>{capitalize(mode)}</button>;
	}

	return (
		<>
			<h2 className='settings-header'>Nastavení</h2>
			<SettingsCategory mode='obecné' />
			<SettingsCategory mode='kvíz' />
			<SettingsCategory mode='seznam' />
			<SettingsCategory mode='klávesové zkratky' />
		</>
	);
}
