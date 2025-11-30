import type { Folder } from 'src/types/variables';

export type MenuStore = {
	isOpened: boolean;
	open: () => void;
	close: () => void;
	toggle: () => void;
};

export type PathViewerStore = {
	isOpened: boolean;
	open: () => void;
	close: () => void;
};

export type FileSystemStore = {
	selectedFolder: Folder[];
	path: string[];
	folderName: string | null;
	addToPath: (item: string) => void;
	cutPath: () => void;
	setSelectedFolder: (folder: Folder[]) => void;
	setFolderName: (name: string | null) => void;
};

// export const useFileSystemStore = create((set) => ({
//   selectedFolder: fileSystem,
//   path: [],
//   folderName: null,
//   addToPath: (item) => set((state) => ({ path: [...state.path, item] })),
//   cutPath: () => set((state) => ({ path: state.path.slice(0, state.path.length - 1) })),
//   setSelectedFolder: (folder) => set({ selectedFolder: folder }),
//   setFolderName: (name) => set({ folderName: name }),
// }));
