import { useMenuStore } from '../data/stores';
import { useMenuVisibility } from '../hooks/useMenuVisibility';

export default function MenuBar() {
	const open = useMenuStore((state) => state.open);

	return (
		<div onClick={(e) => open()} className='md:hidden flex items-center gap-2 bg-neutral-900 px-4 py-2 text-neutral-500 text-xl cursor-pointer'>
			<i className='fa-bars fa-solid'></i> <span className='text-lg'>Menu</span>
		</div>
	);
}
