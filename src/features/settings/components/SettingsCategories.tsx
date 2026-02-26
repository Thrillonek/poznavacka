import { Icon } from '@iconify/react';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { capitalize } from 'src/utils';
import '../assets/_SettingsCategories.scss';
import { categories } from '../data/categories';

type CategoryName = keyof typeof categories;

export default function SettingsCategories() {
	return (
		<>
			<h2 className='settings-header'>Nastavení</h2>
			{(Object.keys(categories) as CategoryName[]).map((category) => (
				<SettingsCategory key={category} mode={category} />
			))}
		</>
	);
}

function SettingsCategory({ mode }: { mode: CategoryName }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentMode = useMemo(() => searchParams.get('settings'), [searchParams]);
	function setMode(mode: CategoryName) {
		setSearchParams((searchParams) => {
			searchParams.set('settings', mode);
			return searchParams;
		});
	}

	const btnProps = useCallback(
		(mode: CategoryName) => {
			return {
				'data-active': currentMode == mode || (currentMode == null && mode == 'obecné'),
				className: 'settings-category',
				onClick: () => {
					setMode(mode);
				},
			};
		},
		[currentMode],
	);

	return (
		<button {...btnProps(mode)}>
			<p className='flex items-center gap-x-4'>
				<Icon className='settings-category-icon' icon={'mdi:' + categories[mode].icon} />
				<span>{capitalize(mode)}</span>
			</p>
			<Icon className='settings-category-icon' icon='mdi:chevron-right' />
		</button>
	);
}
