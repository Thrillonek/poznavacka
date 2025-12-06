import { useState } from 'react';
import SelectionInput from '../ui/SelectionInput';

function QuizSettings() {
	const [test, setTest] = useState(false);

	return (
		<>
			{/* <SelectionInput title='Postupně' active={!test} onSelect={() => setTest(false)} type='checkbox' />
			<SelectionInput title='Náhodně' active={test} onSelect={() => setTest(true)} type='radio' /> */}
		</>
	);
}

export default QuizSettings;
