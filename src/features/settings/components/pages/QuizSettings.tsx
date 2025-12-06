import { useSettingsStore } from 'src/data';
import SelectionInput from '../ui/SelectionInput';
import SwitchInput from '../ui/SwitchInput';

function QuizSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateQuizSettings = useSettingsStore((store) => store.updateQuizSettings);
	const updateCoreSettings = useSettingsStore((store) => store.updateCoreSettings);

	return (
		<>
			<div className='settings-section'>
				<h3>Způsob generace obrázků</h3>
				<SelectionInput title='Postupně' type='radio' active={!settings.quiz.random} onSelect={() => updateQuizSettings('random', false)} />
				<SelectionInput title='Náhodně' type='radio' active={settings.quiz.random} onSelect={() => updateQuizSettings('random', true)} />
			</div>
			<div className='settings-section'>
				<h3>Zkoušená sada</h3>
			</div>
			<div className='settings-section'>
				<h3>Ostatní</h3>
				<SwitchInput title='Vývojářský režim' description='Zobrazit index obrázku ve kvízu' active={settings.devMode} onToggle={() => updateCoreSettings('devMode', !settings.devMode)} />
			</div>
		</>
	);
}

export default QuizSettings;
