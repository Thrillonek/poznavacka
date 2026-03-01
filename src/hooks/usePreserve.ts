import { usePreservePath } from 'src/features/file-system/hooks/usePreservePath';
import { usePreserveCompletedFiles } from './preserveHooks/usePreserveCompletedFiles';
import { usePreserveSettings } from './preserveHooks/usePreserveSettings';

export function usePreserve() {
	usePreserveCompletedFiles();
	usePreserveSettings();
	usePreservePath();
}
