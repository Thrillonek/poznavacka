import { Icon } from '@iconify/react';
import { useMenuElementStore } from 'src/data';
import '../assets/_MenuBar.scss';
import { useMenuStore } from '../data/stores';

export default function MenuBar() {
	const open = useMenuStore((state) => state.open);
	const Element = useMenuElementStore((state) => state.Element);
	const isMenuHidden = useMenuElementStore((state) => state.isMenuHidden);

	return (
		<div data-hidden={isMenuHidden} data-visible-pc={Boolean(Element)} className='menu-bar'>
			<button onClick={() => open()}>
				<Icon icon='mdi:menu' />
				<span className='text-lg'>Menu</span>
			</button>
			{Element && <Element />}
		</div>
	);
}
