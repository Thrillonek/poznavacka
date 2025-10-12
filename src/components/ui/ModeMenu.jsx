import { Icon } from '@iconify/react';
import { useModeStore } from 'src/data/stores';

function ModeMenu() {
	const { mode, setMode } = useModeStore((store) => store);

	return (
		<div className='z-10 flex justify-between items-center bg-neutral-900 px-2 py-1 w-full text-lg'>
			<button onClick={(e) => setMode('quiz')} className={'menu-btn'}>
				<Icon icon='mdi:brain' className={' ' + (mode == 'quiz' ? 'active' : '')} />
			</button>
			<button onClick={(e) => setMode('list')} className={'menu-btn '}>
				<Icon icon='mdi:format-list-bulleted-square' className={' ' + (mode == 'list' ? 'active' : '')} />
			</button>
			<button onClick={(e) => setMode('settings')} className={'menu-btn'}>
				<Icon icon='mdi:gear' className={' ' + (mode == 'settings' ? 'active' : '')}></Icon>
			</button>
		</div>
	);
}

export default ModeMenu;
