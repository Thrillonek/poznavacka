import { Icon } from '@iconify/react';

function Info() {
	return (
		<>
			<div className='flex justify-between items-center mb-2'>
				<h3 className='font-semibold text-neutral-300 text-lg'>Info</h3>
				<button className='block ml-auto' onClick={() => document.getElementById('menu-info').classList.remove('scale-100')}>
					<Icon icon='meteor-icons:xmark' className='text-xl'></Icon>
				</button>
			</div>
			<p>
				Pro vyzkoušení z obsahu celé složky, klikněte na ikonu
				<Icon icon='material-symbols:folder' className='text-2xl' />
				<br />
				<br />
				Po zvolení vaší poznávačky zavřete menu kliknutím na ikonu
				<Icon icon='material-symbols:close-rounded' />
			</p>
		</>
	);
}

export default Info;
