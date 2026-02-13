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

			firstRenderRef.current = false;

			let savedSettings = localStorage.getItem('poznavacka-settings');
			if (typeof savedSettings !== 'string' || savedSettings.length === 0) return;

			let savedSettingsObject = JSON.parse(savedSettings);

			type keyofSettings = keyof typeof settings;
			type keyofSettingsCategory = keyof (typeof settings)[keyofSettings];

			(Object.keys(settings) as keyofSettings[]).forEach((category) => {
				Object.keys(settings[category]).forEach((property) => {
					if (savedSettingsObject[category]?.[property] == null) return;
					updateSettings(category, property as keyofSettingsCategory, savedSettingsObject[category][property]);
				});
			});
		}

		execute();
	}, [settings]);
}
