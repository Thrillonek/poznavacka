import classes from '../../assets/ui/_SwitchInput.module.scss';

type SwitchInputProps = {
	title: string;
	description: string;
	active: boolean;
	onToggle: () => void;
};

function SwitchInput({ title, description, active, onToggle }: SwitchInputProps) {
	return (
		<button onClick={() => onToggle()} data-active={active} className={classes.container}>
			<div className={classes.switch}>
				<div />
			</div>
			<div className={classes.content}>
				<p className={classes.title}>{title}</p>
				<p className={classes.description}>{description}</p>
			</div>
		</button>
	);
}

export default SwitchInput;
