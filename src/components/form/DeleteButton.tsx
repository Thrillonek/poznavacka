import { Icon } from '@iconify/react';
import { useState } from 'react';
import classes from 'src/assets/form/_DeleteButton.module.scss';
import { useModalStore } from 'src/data/modalStore';
import Modal from './Modal';

type DeleteButtonProps = {
	title: string;
	text: string;
	confirmText: string;
	onConfirm: () => void;
};

function DeleteButton({ title, text, confirmText, onConfirm }: DeleteButtonProps) {
	const setModal = useModalStore((state) => state.setModal);

	const modalProps = { text, confirmText, onConfirm };

	const deleteBtnTitle = `Opravdu chceš ${title.toLowerCase()}?`;

	return (
		<>
			<button onClick={() => setModal(deleteBtnTitle)} className={classes['btn-danger']}>
				{title}
			</button>
			<Modal title={deleteBtnTitle} {...modalProps} />
		</>
	);
}

export default DeleteButton;
