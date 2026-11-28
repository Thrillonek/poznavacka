import classes from '../../assets/form/_SwitchInput.module.scss';

type SwitchInputProps = {
	title: string;
	description?: string;
	active: boolean;
	onToggle: () => void;
	activeColor?: string;
};

function SwitchInput({ title, description, active, onToggle, activeColor }: SwitchInputProps) {
	return (
		<button style={{ '--active-color': activeColor ?? 'var(--accent)' } as any} onClick={() => onToggle()} data-active={active} className={classes.container}>
			<div className={classes.switch}>
				<div />
			</div>
			<div className={classes.content}>
				<p className={classes.title}>{title}</p>
				{description && <p className={classes.description}>{description}</p>}
			</div>
		</button>
	);
}

export default SwitchInput;
