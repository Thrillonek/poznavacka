import RangeInput from 'src/components/form/RangeInput';
import SelectionInput from 'src/components/form/SelectionInput';
import SwitchInput from 'src/components/form/SwitchInput';
import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';

function QuizSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateQuizSettings = useSettingsStore((store) => store.updateQuizSettings);

	const updateMin = (newMin: number) => updateQuizSettings('min', newMin);
	const updateMax = (newMax: number) => updateQuizSettings('max', newMax);

	const files = getFiles();

	return (
		<>
			<div className='settings-section'>
				<h3>Způsob generace obrázků</h3>
				<SelectionInput title='Postupně' type='radio' active={!settings.quiz.random} onSelect={() => updateQuizSettings('random', false)} />
				<SelectionInput title='Náhodně' type='radio' active={settings.quiz.random} onSelect={() => updateQuizSettings('random', true)} />
			</div>
			{files.length > 0 && (
				<div className='settings-section'>
					<h3>Zkoušená sada</h3>
					<RangeInput min={settings.quiz.min} max={settings.quiz.max} set={files} setMin={updateMin} setMax={updateMax} />
				</div>
			)}

			<div className='settings-section'>
				<h3>Ostatní</h3>
				<SwitchInput title='Vývojářský režim' description='Zobrazit index obrázku ve kvízu' active={settings.quiz.devMode} onToggle={() => updateQuizSettings('devMode', !settings.quiz.devMode)} />
			</div>
		</>
	);
}

export default QuizSettings;
