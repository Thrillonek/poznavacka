import { create } from 'zustand';

interface ModalStore {
	modal: string;
	setModal: (mode?: string) => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
	modal: '',
	setModal: (newModal) => set({ modal: newModal }),
}));
