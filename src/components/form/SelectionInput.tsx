import { Icon } from '@iconify/react';
import classes from '../../assets/form/_SelectionInput.module.scss';

type SwitchInputProps = {
	title: string;
	active: boolean;
	onSelect: () => void;
	type: 'checkbox' | 'radio';
};

function SelectionInput({ title, active, onSelect, type }: SwitchInputProps) {
	return (
		<button onClick={() => onSelect()} data-active={active} className={classes.container}>
			{type == 'checkbox' && (
				<div className={`${classes.input} ${classes.checkbox}`}>
					<Icon icon='mdi:check' />
				</div>
			)}
			{type == 'radio' && (
				<div className={`${classes.input} ${classes.radio}`}>
					<div />
				</div>
			)}

			<p className={classes.title}>{title}</p>
		</button>
	);
}

export default SelectionInput;
