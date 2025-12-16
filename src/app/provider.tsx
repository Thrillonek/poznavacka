import type { PropsWithChildren } from 'react';
import 'src/assets/_global.scss';
import { useAddEventListener, useInitiateDragEvent, useInitiateSwipeEvent } from 'src/hooks';
import { useUpdatePoznavacka } from 'src/hooks/useUpdatePoznavacka';

export function AppProvider({ children }: PropsWithChildren) {
	useUpdatePoznavacka();
	useInitiateSwipeEvent();
	useInitiateDragEvent();

	useAddEventListener('custom:drag', (e) => {
		console.log(e.detail.deltaX, e.detail.deltaY);
	});

	return <>{children}</>;
}
