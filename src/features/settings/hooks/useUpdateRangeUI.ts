import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useSettingsStore } from 'src/data';

export function useUpdateRangeUI(files: string[], setMinMaxInput: Dispatch<SetStateAction<Record<string, number>>>) {
	const { min, max } = useSettingsStore((store) => store.settings.quiz);

	useEffect(() => {
		if (max > files.length) {
			setMinMaxInput((prev) => ({ ...prev, max: files.length }));
		} else if (min < 1) {
			setMinMaxInput((prev) => ({ ...prev, min: 0 }));
		} else {
			setMinMaxInput({ min, max });
		}
	}, [min, max]);
}
