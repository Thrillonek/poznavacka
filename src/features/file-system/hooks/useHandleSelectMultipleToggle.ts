import { useEffect } from 'react';
import { usePoznavackaStore } from 'src/data';
import { getFolderName } from 'src/utils/objectManipulation';
import { useFileSystemStore, useSelectMultipleStore } from '../data/stores';

export function useHandleSelectMultipleToggle() {
	const isSelecting = useSelectMultipleStore((store) => store.isSelecting);
	const addSelectedItem = useSelectMultipleStore((store) => store.addSelectedItem);

	useEffect(() => {
		if (isSelecting) {
			const poznavacka = usePoznavackaStore.getState().poznavacka;
			useSelectMultipleStore.setState({ selectedItems: [] });
			if (poznavacka) {
				const folderName = useFileSystemStore.getState().folderName;

				addSelectedItem(getFolderName(poznavacka) === folderName?.toLowerCase() ? 'this' : getFolderName(poznavacka));
			}
		}
	}, [isSelecting]);
}
