import classes from '../../assets/ui/_SwitchInput.module.scss';

type SwitchInputProps = {
	title: string;
	description: string;
	active: boolean;
	toggle: () => void;
};

function SwitchInput({ title, description, active, toggle }: SwitchInputProps) {
	return (
		<button onClick={() => toggle()} data-active={active} className={classes.container}>
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
