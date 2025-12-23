// import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useAddEventListener } from 'src/hooks';
import type { SettingsStore } from 'src/types/settings';
import { getKey } from 'src/utils/form/getKey';
import classes from '../../assets/form/_KeybindInput.module.scss';

type SwitchInputProps = {
	title: string;
	keybindName: keyof SettingsStore['settings']['keybinds'];
	keybinds: Record<string, string>;
	setKeybind: (keybind: keyof SettingsStore['settings']['keybinds'], newValue: string) => void;
};

function KeybindInput({ title, keybindName, keybinds, setKeybind }: SwitchInputProps) {
	const [isListeningForKeys, setIsListeningForKeys] = useState(false);
	const [error, setError] = useState('');
	const [showedText, setShowedText] = useState('');

	useEffect(() => () => setIsListeningForKeys(false), []);

	useEffect(() => {
		if (error) {
			setTimeout(() => setError(''), 1000);
		}
	}, [error]);

	useEffect(() => {
		function execute() {
			if (error) return setShowedText(error);
			if (isListeningForKeys) return setShowedText('Stiskněte novou klávesu...');
			setShowedText(title);
		}

		execute();
	}, [error, isListeningForKeys]);

	useAddEventListener(
		'keydown',
		(e: KeyboardEvent) => {
			if (isListeningForKeys) {
				if (Object.values(keybinds).some((keybind) => keybind === e.key)) return setError('Klávesa je jiz použitá');

				if (e.key !== 'Escape') setKeybind(keybindName, e.key);
				setIsListeningForKeys(false);
			}
		},
		[isListeningForKeys]
	);

	return (
		<button onClick={() => setIsListeningForKeys(!isListeningForKeys)} className={classes.container}>
			<p data-error={Boolean(error)} data-listening={isListeningForKeys} className={classes.title}>
				{showedText}
			</p>
			<div className={classes.keybind}>
				<p>{getKey(keybinds[keybindName])}</p>
			</div>
		</button>
	);
}

export default KeybindInput;
