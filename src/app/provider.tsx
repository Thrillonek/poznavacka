import type { PropsWithChildren } from 'react';
import 'src/assets/_global.scss';
import { useInitiateDragEvent, useInitiateSwipeEvent, usePreserveSettings, useUpdatePoznavacka } from 'src/hooks';

export function AppProvider({ children }: PropsWithChildren) {
	useUpdatePoznavacka();
	useInitiateSwipeEvent();
	useInitiateDragEvent();
	usePreserveSettings();

	return <>{children}</>;
}
