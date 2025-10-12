import { useUpdatePoznavacka } from 'src/hooks/useUpdatePoznavacka';

export function AppProvider({ children }) {
	useUpdatePoznavacka();

	return <>{children}</>;
}
