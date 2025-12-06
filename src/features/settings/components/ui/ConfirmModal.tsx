import { Icon } from '@iconify/react';
import { useCompletedFilesStore } from 'src/data/stores';
import { useSettingsStatusStore } from '../../data/stores';

function ConfirmModal() {
	const isModalOpen = useSettingsStatusStore((store) => store.isModalOpen);
	const closeModal = useSettingsStatusStore((store) => store.closeModal);
	const clearCompletedFiles = useCompletedFilesStore((store) => store.clearCompletedFiles);

	return (
		<div onClick={closeModal} className={'fixed w-screen z-50 top-0 left-0 transition-opacity backdrop-blur-sm h-screen bg-black bg-opacity-20 ' + (isModalOpen ? '' : 'pointer-events-none opacity-0')}>
			<div onClick={(e) => e.stopPropagation()} className='modal'>
				<button onClick={closeModal} className='top-2 right-2 absolute hover:bg-neutral-700 p-1 rounded-full'>
					<Icon icon='material-symbols:close' className='text-neutral-500 text-2xl'></Icon>
				</button>
				<p className='text-neutral-300 text-lg md:text-2xl text-center'>Vážně chceš odstranit všechny svoje vědomosti?</p>
				<div className='flex gap-x-4 mt-8'>
					<button
						className='btn-danger'
						onClick={() => {
							clearCompletedFiles();
							closeModal();
						}}
					>
						Ano
					</button>
					<button className='!bg-blue-500 hover:brightness-110 !border-blue-500 btn-danger' onClick={closeModal}>
						Ne
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmModal;
