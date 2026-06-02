import type { CompletedFilesStore, InformationStore, MenuElementStore, PoznavackaStore, PresetStore } from 'src/types/stores';
import { create } from 'zustand';

export const usePoznavackaStore = create<PoznavackaStore>()((set) => ({
	poznavacka: null,
	basePoznavacka: null,
	setPoznavacka: (newPoznavacka) => set({ basePoznavacka: newPoznavacka }),
	updatePoznavacka: (newPoznavacka) => set({ poznavacka: newPoznavacka }),
}));

export const useCompletedFilesStore = create<CompletedFilesStore>()((set) => ({
	completedFiles: [],
	addFileToCompleted: (file) => set((state: any) => ({ completedFiles: [...state.completedFiles, file] })),
	removeFileFromCompleted: (file) => set((state: any) => ({ completedFiles: state.completedFiles.filter((item: string) => item != file) })),
	clearCompletedFiles: (callback) => (callback ? set((state) => ({ completedFiles: state.completedFiles.filter((f) => !callback(f)) })) : set({ completedFiles: [] })),
	setCompletedFiles: (files) => set({ completedFiles: files }),
}));

export const useMenuElementStore = create<MenuElementStore>((set) => ({
	isMenuHidden: false,
	Element: null,
	toggleHideMenu: (mode) => set((state) => ({ isMenuHidden: mode == undefined ? !state.isMenuHidden : mode })),
	setElement: (element) => set({ Element: element }),
}));

export const useInformationStore = create<InformationStore>()((set) => ({
	title: '',
	isVisible: false,
	setInformation: (title) => set({ title, isVisible: true }),
	hideInformation: () => set({ isVisible: false }),
}));
