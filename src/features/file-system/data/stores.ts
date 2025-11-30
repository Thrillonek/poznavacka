import { fileSystem } from 'src/data';
import { create } from 'zustand';
import type { FileSystemStore, MenuStore, PathViewerStore } from '../types/stores';

export const useMenuStore = create<MenuStore>()((set) => ({
	isOpened: true,
	open: () => set({ isOpened: true }),
	close: () => set({ isOpened: false }),
	toggle: () => set((state) => ({ isOpened: !state.isOpened })),
}));

export const useFileSystemStore = create<FileSystemStore>()((set) => ({
	selectedFolder: fileSystem,
	path: [],
	folderName: null,
	addToPath: (item) => set((state) => ({ path: [...state.path, item] })),
	cutPath: () => set((state) => ({ path: state.path.slice(0, state.path.length - 1) })),
	setSelectedFolder: (folder) => set({ selectedFolder: folder }),
	setFolderName: (name) => set({ folderName: name }),
}));

export const usePathViewerStore = create<PathViewerStore>()((set) => ({
	isOpened: true,
	open: () => set({ isOpened: true }),
	close: () => set({ isOpened: false }),
}));
