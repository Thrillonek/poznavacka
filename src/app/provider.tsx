import type { PropsWithChildren } from 'react';
import 'src/assets/_global.scss';
import { useInitiateDragEvent, useInitiateSwipeEvent } from 'src/hooks';
import { useUpdatePoznavacka } from 'src/hooks/useUpdatePoznavacka';

export function AppProvider({ children }: PropsWithChildren) {
	useUpdatePoznavacka();
	useInitiateSwipeEvent();
	useInitiateDragEvent();

	return <>{children}</>;
}
