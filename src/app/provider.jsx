import { useUpdatePoznavacka } from '@/hooks/useUpdatePoznavacka';

export function AppProvider({ children }) {
	useUpdatePoznavacka();

	return <>{children}</>;
}
