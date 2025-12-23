import { Icon } from '@iconify/react';
import { useCallback } from 'react';
import { capitalize } from 'src/utils';
import '../assets/_SettingsCategories.scss';
import { useSettingsModeStore } from '../data/stores';
import type { SettingsModes } from '../types/stores';

export default function SettingsCategories() {
	return (
		<>
			<h2 className='settings-header'>Nastavení</h2>
			<SettingsCategory mode='obecné' />
			<SettingsCategory mode='kvíz' />
			<SettingsCategory mode='seznam' />
			<SettingsCategory mode='klávesové zkratky' />
			<SettingsCategory mode='vzhled' />
		</>
	);
}

function SettingsCategory({ mode }: { mode: SettingsModes }) {
	const currentMode = useSettingsModeStore((store) => store.mode);
	const setMode = useSettingsModeStore((store) => store.setMode);

	const btnProps = useCallback(
		(mode: SettingsModes) => {
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

	const getIcon = () => {
		switch (mode) {
			case 'obecné':
				return 'house';
			case 'kvíz':
				return 'brain';
			case 'seznam':
				return 'format-list-bulleted-square';
			case 'klávesové zkratky':
				return 'keyboard';
			case 'vzhled':
				return 'color';
		}
	};

	return (
		<button {...btnProps(mode)}>
			<p className='flex items-center gap-x-4'>
				<Icon className='settings-category-icon' icon={'mdi:' + getIcon()} />
				<span>{capitalize(mode)}</span>
			</p>
			<Icon className='settings-category-icon' icon='mdi:chevron-right' />
		</button>
	);
}
