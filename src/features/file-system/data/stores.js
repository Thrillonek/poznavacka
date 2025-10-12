import { fileSystem } from '@/data';
import { create } from 'zustand';

export const useMenuStore = create((set) => ({
	isOpened: false,
	open: () => set({ isOpened: true }),
	close: () => set({ isOpened: false }),
	toggle: () => set((state) => ({ isOpened: !state.isOpened })),
}));

export const useFileSystemStore = create((set) => ({
	selectedFolder: fileSystem,
	path: [],
	folderName: null,
	addToPath: (item) => set((state) => ({ path: [...state.path, item] })),
	cutPath: () => set((state) => ({ path: state.path.slice(0, state.path.length - 1) })),
	setSelectedFolder: (folder) => set({ selectedFolder: folder }),
	setFolderName: (name) => set({ folderName: name }),
}));
