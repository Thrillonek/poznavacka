import type { Colors } from '../types/base';

export function loadColors(preset: string | null) {
	const root: HTMLElement = document.querySelector(':root')!;
	root.style.setProperty('--color-scale', '0');

	if (preset) {
		let hexCodes: string[] = [];
		if (preset == 'default') hexCodes = ['#9ca3af', '#c8cddc', '#374151', '#697387', '#4b505f'];
		if (preset == 'pink') hexCodes = ['#99244F', '#B92D5D', '#EE719E', '#F4A4C0', '#F4A4C0'];
		let vars = ['--text-main', '--text-bright', '--bg-main', '--bg-secondary', '--bg-bright'];
		for (const v in vars) {
			root.style.setProperty(vars[v], hexCodes[v]);
		}

		document.querySelectorAll<HTMLInputElement>('.color-picker')?.forEach((el) => {
			const color = getComputedStyle(root).getPropertyValue(el.id);
			el.value = color;
		});
	}
	let colors: Colors = [];
	document.querySelectorAll<HTMLInputElement>('.color-picker')?.forEach((el) => {
		colors.push({ name: el.id, value: el.value });
		if (el.value && !preset) root.style.setProperty(el.id, el.value);
	});
	// axios
	// 	.post('/api/index', {
	// 		colors,
	// 	})
	// 	.catch((err) => console.error(err.response.data.message));
}
