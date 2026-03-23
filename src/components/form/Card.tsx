import classes from '../../assets/form/_Card.module.scss';

type CardProps = {
	title: string;
	content: string;
	icon?: string;
};

function Card({ title, content, icon }: CardProps) {
	return (
		<>
			<div className={classes.card}>
				<p className={classes.title}>{title}</p>
				<h3 className={classes.content}>{content}</h3>
			</div>
		</>
	);
}

export default Card;
