import { useState } from 'react';
import classes from '../../assets/ui/_DeleteButton.module.scss';

type DeleteButtonProps = {
	title: string;
	text: string;
};

function DeleteButton({ title, text }: DeleteButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button onClick={() => setIsModalOpen(true)} className={classes['btn-danger']}>
				{title}
			</button>
			<div onClick={() => setIsModalOpen(false)} data-open={isModalOpen} className={classes.modal}>
				<div onClick={(e) => e.stopPropagation()}>
					<h2>Opravdu chceš {title.toLowerCase()}?</h2>
					<p>{text}</p>
					{/* <div className='flex gap-x-4 mt-8'>
						<button className={classes['btn-danger']} onClick={() => setIsModalOpen(false)}>
							Ano
						</button>
						<button className={classes['btn-danger']} onClick={() => setIsModalOpen(false)}>
							Ne
						</button>
					</div> */}
				</div>
			</div>
		</>
	);
}

export default DeleteButton;
