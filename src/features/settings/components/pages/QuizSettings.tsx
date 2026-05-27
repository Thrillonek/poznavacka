import { Fragment } from 'react/jsx-runtime';
import MinMaxInput from 'src/components/form/MinMaxInput';
import SelectionInput from 'src/components/form/SelectionInput';
import SwitchInput from 'src/components/form/SwitchInput';
import { useSettingsStore } from 'src/data';
import { getFiles } from 'src/utils';
import { tweakRange } from '../../utils';

function QuizSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	const updateMin = (newMin: number) => updateSettings('quiz', 'min', newMin);
	const updateMax = (newMax: number) => updateSettings('quiz', 'max', newMax);
	const updateMinMax = (newMin: number, newMax: number) => {
		updateMin(newMin);
		updateMax(newMax);
	};

	const files = getFiles();

	return (
		<>
			<div className='settings-section'>
				<h3>Způsob generace obrázků</h3>
				<SelectionInput title='Postupně' type='radio' active={!settings.quiz.random} onSelect={() => updateSettings('quiz', 'random', false)} />
				<SelectionInput title='Náhodně' type='radio' active={settings.quiz.random} onSelect={() => updateSettings('quiz', 'random', true)} />
			</div>
			{files.length > 0 && (
				<div className='settings-section'>
					<h3>Zkoušená sada</h3>
					<MinMaxInput min={settings.quiz.min} max={settings.quiz.max} set={files} setMin={updateMin} setMax={updateMax} />
					<div className='flex flex-wrap gap-2'>
						{[10, 50].map((num, idx) => (
							<Fragment key={idx}>
								<button onClick={() => updateMinMax(1, num)} className='settings-standalone-button'>
									1-{num}
								</button>
								<button onClick={() => tweakRange(-num)} className='settings-standalone-button'>
									<span className='inline-block rotate-180'>{'->'}</span>
									{num}
								</button>
								<button onClick={() => tweakRange(num)} className='settings-standalone-button'>
									{`->${num}`}
								</button>
								<button onClick={() => tweakRange(-num, 'add')} className='settings-standalone-button'>
									{`-${num}`}
								</button>
								<button onClick={() => tweakRange(num, 'add')} className='settings-standalone-button'>
									{`+${num}`}
								</button>
							</Fragment>
						))}
					</div>
				</div>
			)}

			<div className='settings-section'>
				<h3>Ostatní</h3>
				<SwitchInput title='Vývojářský režim' description='Zobrazit index obrázku ve kvízu' active={settings.quiz.devMode} onToggle={() => updateSettings('quiz', 'devMode', !settings.quiz.devMode)} />
			</div>
		</>
	);
}

export default QuizSettings;
