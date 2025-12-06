import { Icon } from '@iconify/react';
import { useState } from 'react';
import classes from '../../assets/ui/_DeleteButton.module.scss';

type DeleteButtonProps = {
	title: string;
	text: string;
	confirmText: string;
	onConfirm: () => void;
};

function DeleteButton({ title, text, confirmText, onConfirm }: DeleteButtonProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function confirmModal() {
		setIsModalOpen(false);
		onConfirm();
	}

	return (
		<>
			<button onClick={() => setIsModalOpen(true)} className={classes['btn-danger']}>
				{title}
			</button>
			<div onClick={() => setIsModalOpen(false)} data-open={isModalOpen} className={classes.modal}>
				<div onClick={(e) => e.stopPropagation()}>
					<button onClick={() => setIsModalOpen(false)} className={classes['modal-btn-close']}>
						<Icon icon='mdi:close' />
					</button>
					<div>
						<h2>Opravdu chceš {title.toLowerCase()}?</h2>
						<p>{text}</p>
					</div>
					<div className='flex gap-x-4'>
						<button className={classes['modal-btn-confirm']} onClick={() => confirmModal()}>
							{confirmText}
						</button>
						<button className={classes['modal-btn-cancel']} onClick={() => setIsModalOpen(false)}>
							Zrušit
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default DeleteButton;
