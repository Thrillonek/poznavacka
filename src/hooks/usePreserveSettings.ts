import { useEffect, useRef } from 'react';
import { useSettingsStore } from 'src/data';

export function usePreserveSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const updateSettings = useSettingsStore((store) => store.updateSettings);

	const firstRenderRef = useRef(true);

	useEffect(() => {
		function execute() {
			if (!firstRenderRef.current) {
				localStorage.setItem('poznavacka-settings', JSON.stringify(settings));
				return;
			}

			if (firstRenderRef.current) firstRenderRef.current = false;

			let savedSettings = localStorage.getItem('poznavacka-settings');
			if (typeof savedSettings == 'string' && savedSettings.length > 0) {
				let savedSettingsObject = JSON.parse(savedSettings);

				Object.keys(savedSettingsObject).forEach((category: any) => {
					if (!Object.keys(settings).includes(category)) return;

					Object.keys(savedSettingsObject[category]).forEach((key) => {
						if ((settings as any)[category][key] == null) return;
						updateSettings(category, key, savedSettingsObject[category][key]);
					});
				});
			}
		}

		execute();
	}, [settings]);
}
