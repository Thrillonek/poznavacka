import { usePreserveCompletedFiles } from './preserveHooks/usePreserveCompletedFiles';
import { usePreservePath } from './preserveHooks/usePreservePath';
import { usePreserveSettings } from './preserveHooks/usePreserveSettings';

export function usePreserve() {
	usePreserveCompletedFiles();
	usePreserveSettings();
	usePreservePath();
}
