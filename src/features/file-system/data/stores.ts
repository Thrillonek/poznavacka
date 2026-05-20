import { fileSystem } from 'src/data';
import { create } from 'zustand';
import type { FileSystemStore, MenuStore, PathViewerStore, SelectMultipleStore } from '../types/stores';

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
	setPath: (path) => set({ path }),
	setSelectedFolder: (folder) => set({ selectedFolder: folder }),
	setFolderName: (name) => set({ folderName: name }),
}));

export const usePathViewerStore = create<PathViewerStore>()((set) => ({
	isOpened: false,
	open: () => set({ isOpened: true }),
	close: () => set({ isOpened: false }),
}));

export const useSelectMultipleStore = create<SelectMultipleStore>()((set) => ({
	isSelecting: false,
	toggleSelection: (cond) => set((state) => ({ isSelecting: cond !== undefined ? cond : !state.isSelecting })),
	selectedItems: [],
	addSelectedItem: (item) => set((state) => ({ selectedItems: [...state.selectedItems, item] })),
	removeSelectedItem: (item) => set((state) => ({ selectedItems: state.selectedItems.filter((i) => i !== item) })),
}));
