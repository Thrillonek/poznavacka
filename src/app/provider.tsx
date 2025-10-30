import type { PropsWithChildren } from 'react';
import 'src/assets/_global.scss';
import { useUpdatePoznavacka } from 'src/hooks/useUpdatePoznavacka';

export function AppProvider({ children }: PropsWithChildren) {
	useUpdatePoznavacka();

	return <>{children}</>;
}
