import { useEffect, useRef } from 'react';
import { useSettingsStore } from 'src/data';

export function usePreserveSettings() {
	const settings = useSettingsStore((store) => store.settings);
	const setSettings = useSettingsStore((store) => store.setSettings);

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
				setSettings(savedSettingsObject);
			}
		}

		execute();
	}, [settings]);
}
