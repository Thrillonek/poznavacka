import type { PropsWithChildren } from 'react';
import 'src/assets/_global.scss';
import { useSettingsStore } from 'src/data';
import { useInitiateDragEvent, useInitiateSwipeEvent, usePreserveSettings, useUpdatePoznavacka } from 'src/hooks';
import { useChangeTheme } from 'src/hooks/useChangeTheme';

export function AppProvider({ children }: PropsWithChildren) {
	const settings = useSettingsStore((store) => store.settings);

	useUpdatePoznavacka();
	useInitiateSwipeEvent();
	useInitiateDragEvent();
	usePreserveSettings();
	useChangeTheme(settings.colorPicker);

	return <>{children}</>;
}
