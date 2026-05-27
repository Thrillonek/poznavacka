import { useEffect, useRef } from 'react';
import { fileSystem, usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName, isObject } from 'src/utils';
import { z } from 'zod';
import { useFileSystemStore, useMenuStore } from '../data/stores';

const SavedPath = z.object({
	path: z.array(z.string()),
	poznavacka: z.string() || z.record(z.string(), z.array(z.any())) || null,
});

export function usePreservePath() {
	const path = useFileSystemStore((store) => store.path);
	const addToPath = useFileSystemStore((store) => store.addToPath);
	const cutPath = useFileSystemStore((store) => store.cutPath);
	const setSelectedFolder = useFileSystemStore((store) => store.setSelectedFolder);
	const setFolderName = useFileSystemStore((store) => store.setFolderName);

	const closeMenu = useMenuStore((store) => store.close);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const setPoznavacka = usePoznavackaStore((store) => store.setPoznavacka);

	const firstRenderRef = useRef(true);

	useEffect(() => {
		function execute() {
			function getNextFolder(folderContent: Folder[], path: string[], idx: number = 0) {
				const folder = folderContent.find((f) => getFolderName(f!) == path[idx]);
				if (!folder) {
					for (let _ in path) {
						cutPath();
					}
					return null;
				}

				if (idx < path.length - 1) {
					return getNextFolder(getContent(folder!), path, idx + 1);
				} else return folder;
			}

			if (!firstRenderRef.current) {
				localStorage.setItem('poznavacka-path', JSON.stringify({ path, poznavacka }));
				return;
			}

			firstRenderRef.current = false;

			// FIRST RENDER
			let savedPath: string | null = localStorage.getItem('poznavacka-path');
			if (!savedPath) return;

			let parsedSavedPath;

			try {
				parsedSavedPath = JSON.parse(savedPath);
			} catch (error) {
				console.error('Error parsing saved path:', error);
				return;
			}

			try {
				SavedPath.parse(parsedSavedPath);
			} catch (error) {
				console.error('Error parsing saved path:', error);
				return;
			}

			parsedSavedPath.path.forEach((item: string) => addToPath(item));
			const currentFolder = getNextFolder(fileSystem, parsedSavedPath.path);

			setSelectedFolder(currentFolder ? getContent(currentFolder) : fileSystem);
			setFolderName(currentFolder ? capitalize(getFolderName(currentFolder)) : '');

			if (currentFolder && parsedSavedPath.poznavacka) {
				if (typeof parsedSavedPath.poznavacka === 'object') {
					// checks for old save where poznavacka was saved as the entire folder
					setPoznavacka(parsedSavedPath.poznavacka);
				} else if (typeof parsedSavedPath.poznavacka === 'string') {
					// newer version where only the name of the folder is saved and then found in FS
					if (getFolderName(currentFolder) === parsedSavedPath.poznavacka) {
						setPoznavacka(currentFolder);
					} else if (getContent(currentFolder).some((f: Folder | string) => !(typeof f === 'string') && getFolderName(f!) === parsedSavedPath.poznavacka)) {
						setPoznavacka(getContent(currentFolder).find((f: Folder | string) => !(typeof f === 'string') && getFolderName(f!) === parsedSavedPath.poznavacka));
					} else {
						setPoznavacka(null);
					}
				}
				closeMenu();
			} else {
				setPoznavacka(null);
			}
		}

		execute();
	}, [path, poznavacka]);
}
