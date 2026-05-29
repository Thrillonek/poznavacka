import { Icon } from '@iconify/react';
import { useState } from 'react';
import classes from 'src/assets/form/_Modal.module.scss';
import { useModalStore } from 'src/data/modalStore';

type ModalProps = {
	title: string;
	text: string;
	confirmText: string;
	onConfirm: () => void;
};

function Modal({ title, text, confirmText, onConfirm }: ModalProps) {
	const modal = useModalStore((state) => state.modal);
	const setModal = useModalStore((state) => state.setModal);

	function confirmModal() {
		setModal('');
		onConfirm();
	}

	return (
		<div onClick={() => setModal('')} data-open={modal === title} className={classes.modal}>
			<div onClick={(e) => e.stopPropagation()}>
				<button onClick={() => setModal('')} className={classes['modal-btn-close']}>
					<Icon icon='mdi:close' />
				</button>
				<div className='flex flex-col gap-2'>
					<h2>{title}</h2>
					<p>{text}</p>
				</div>
				<div className='flex gap-x-4'>
					<button className={classes['modal-btn-confirm']} onClick={() => confirmModal()}>
						{confirmText}
					</button>
					<button className={classes['modal-btn-cancel']} onClick={() => setModal('')}>
						Zrušit
					</button>
				</div>
			</div>
		</div>
	);
}

export default Modal;
