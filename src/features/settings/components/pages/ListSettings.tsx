import { useSettingsStore } from 'src/data';
import SelectionInput from '../ui/SelectionInput';

function ListSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateListSettings = useSettingsStore((store) => store.updateListSettings);

	return (
		<>
			<div className='settings-section'>
				<h3>Ukazovat soubory...</h3>
				<SelectionInput title='Ukázat všechno' active={settings.list.showFiles == 'all'} type='radio' onSelect={() => updateListSettings('showFiles', 'all')} />
				<SelectionInput title='Skrýt splněné' active={settings.list.showFiles == 'uncompleted'} type='radio' onSelect={() => updateListSettings('showFiles', 'uncompleted')} />
				<SelectionInput title='Ukázat jen splněné' active={settings.list.showFiles == 'completed'} type='radio' onSelect={() => updateListSettings('showFiles', 'completed')} />
			</div>
		</>
	);
}

export default ListSettings;
