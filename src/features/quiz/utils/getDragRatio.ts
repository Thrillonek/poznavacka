export function getDragRatio(deltaX: number) {
	const mainContent = document.querySelector('.main-content') as HTMLDivElement;
	if (!mainContent) return;
	return deltaX / mainContent.clientWidth;
}
