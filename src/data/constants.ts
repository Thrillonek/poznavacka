import { create } from 'zustand';

export const useFileSystemStore = create((set) => ({
	fileSystem: null,
	setFileSystem: (fileSystem: any) => set({ fileSystem }),
}));

const isVite = typeof import.meta !== 'undefined' && typeof import.meta.env !== 'undefined';
//@ts-expect-error
export const fileSystem = isVite ? __FILE_SYSTEM__ : useFileSystemStore?.getState().fileSystem;
export const allowedFileExtensions = ['jpg', 'jpeg', 'png', 'gif', 'apng', 'avif', 'svg', 'webp'];
