import { useEffect, useRef } from 'react';
import { fileSystem, usePoznavackaStore } from 'src/data';
import type { Folder } from 'src/types/variables';
import { capitalize, getContent, getFolderName } from 'src/utils';
import { useFileSystemStore, useMenuStore } from '../data/stores';

type SavedPath = {
	path: string[];
	poznavacka: string | null;
};

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
				localStorage.setItem('poznavacka-path', JSON.stringify({ path, poznavacka: poznavacka ? getFolderName(poznavacka) : null }));
				return;
			}

			firstRenderRef.current = false;

			// FIRST RENDER
			let savedPath: string | SavedPath | null = localStorage.getItem('poznavacka-path');
			if (!savedPath) return;

			savedPath = JSON.parse(savedPath) as SavedPath;

			savedPath.path.forEach((item) => addToPath(item));
			const currentFolder = getNextFolder(fileSystem, savedPath.path);

			setSelectedFolder(currentFolder ? getContent(currentFolder) : fileSystem);
			setFolderName(currentFolder ? capitalize(getFolderName(currentFolder)) : '');

			if (currentFolder && savedPath.poznavacka) {
				setPoznavacka(getNextFolder(getContent(currentFolder), [savedPath.poznavacka]));
				closeMenu();
			} else {
				setPoznavacka(null);
			}
		}

		execute();
	}, [path, poznavacka]);
}
