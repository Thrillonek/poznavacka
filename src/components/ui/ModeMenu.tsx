import { Icon } from '@iconify/react';
import 'src/assets/_ModeMenu.scss';
import { useModeStore } from 'src/data/stores';

function ModeMenu() {
	const { mode, setMode } = useModeStore((store) => store);

	return (
		<div className='shadow-base mode-menu'>
			<button onClick={() => setMode('quiz')} className={mode == 'quiz' ? 'active' : ''}>
				<Icon icon='mdi:brain' />
			</button>
			<button onClick={() => setMode('list')} className={mode == 'list' ? 'active' : ''}>
				<Icon icon='mdi:format-list-bulleted-square' />
			</button>
			<button onClick={() => setMode('settings')} className={mode == 'settings' ? 'active' : ''}>
				<Icon icon='mdi:gear' />
			</button>
		</div>
	);
}

export default ModeMenu;
