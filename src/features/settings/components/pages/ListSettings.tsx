import SelectionInput from 'src/components/form/SelectionInput';
import { useSettingsStore } from 'src/data';

function ListSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	return (
		<>
			<div className='settings-section'>
				<h3>Ukazovat soubory...</h3>
				<SelectionInput title='Ukázat všechno' active={settings.list.showFiles == 'all'} type='radio' onSelect={() => updateSettings('list', 'showFiles', 'all')} />
				<SelectionInput title='Skrýt splněné' active={settings.list.showFiles == 'uncompleted'} type='radio' onSelect={() => updateSettings('list', 'showFiles', 'uncompleted')} />
				<SelectionInput title='Ukázat jen splněné' active={settings.list.showFiles == 'completed'} type='radio' onSelect={() => updateSettings('list', 'showFiles', 'completed')} />
			</div>
		</>
	);
}

export default ListSettings;
