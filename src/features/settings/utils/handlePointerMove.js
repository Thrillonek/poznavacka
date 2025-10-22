const rangeRectRef = useRef();
rangeRectRef.current = document.getElementById('size-range')?.getBoundingClientRect();
export function handlePointerMove(e) {
	if (!activeRange) return;
	const rangeRect = rangeRectRef.current;
	const pos = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };

	let calculation = Math.round(((pos.x - rangeRect.left) * (files.length - 1)) / rangeRect.width) + 1;
	if (calculation > files.length) calculation = files.length;
	if (calculation < 1) calculation = 1;
	if ((calculation == max && activeRange == 'min') || (calculation == min && activeRange == 'max')) return;
	updateQuizSettings(activeRange, calculation);
}
