import type { PropsWithChildren } from 'react';
import { useUpdatePoznavacka } from 'src/hooks/useUpdatePoznavacka';

export function AppProvider({ children }: PropsWithChildren) {
	useUpdatePoznavacka();

	return <>{children}</>;
}
