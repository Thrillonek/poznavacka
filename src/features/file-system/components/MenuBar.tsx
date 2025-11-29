import { Icon } from '@iconify/react';
import '../assets/_MenuBar.scss';
import { useMenuStore } from '../data/stores';

export default function MenuBar() {
	const open = useMenuStore((state) => state.open);

	return (
		<div className='menu-bar'>
			<button onClick={() => open()}>
				<Icon icon='mdi:menu' />
				<span className='text-lg'>Menu</span>
			</button>
		</div>
	);
}
