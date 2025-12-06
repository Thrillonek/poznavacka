import { useSettingsStore } from 'src/data';
import DeleteButton from '../ui/DeleteButton';
import SwitchInput from '../ui/SwitchInput';

function GeneralSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateCoreSettings = useSettingsStore((store) => store.updateCoreSettings);

	return (
		<>
			<SwitchInput title='Odstranit duplikované obrázky' description='Zajistí, že každý název bude v poznávačce jen jednou' active={settings.removeDuplicates} toggle={() => updateCoreSettings('removeDuplicates', !settings.removeDuplicates)} />
			<DeleteButton title='Resetovat naučené obrázky' text='Tímto u všech obrázků ve všech poznávačkách vymažeš označení "naučené" (začnou se ti objevovat ve kvízu).' />
		</>
	);
}

export default GeneralSettings;
