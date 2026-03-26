import { Icon } from '@iconify/react';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { capitalize } from 'src/utils';
import '../assets/_SettingsCategories.scss';
import { categories, nestedCategories } from '../data/categories';

type CategoryName = keyof typeof categories;

export default function SettingsCategories() {
	return (
		<>
			{(Object.keys(nestedCategories) as (keyof typeof nestedCategories)[]).map((category) => (
				<div className='flex flex-col gap-2' key={category}>
					<h2 className='settings-header'>{capitalize(category)}</h2>
					{Object.keys(nestedCategories[category]).map((subcategory) => (
						<SettingsCategory key={subcategory} mode={subcategory as CategoryName} />
					))}
				</div>
			))}
		</>
	);
}

function SettingsCategory({ mode }: { mode: CategoryName }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const currentMode = useMemo(() => searchParams.get('settings'), [searchParams]);
	function setMode(mode: CategoryName) {
		setSearchParams({ ...Object.fromEntries(searchParams.entries()), settings: mode });
	}

	const btnProps = useCallback(
		(mode: CategoryName) => {
			return {
				'data-active': currentMode?.includes(mode) || (currentMode == null && mode == 'obecné'),
				className: 'settings-category',
				onClick: () => {
					setMode(mode);
				},
			};
		},
		[currentMode, searchParams],
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
