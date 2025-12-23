import { useEffect } from 'react';
import { themes } from 'src/data/themes';

export function useChangeTheme(theme: string) {
	useEffect(() => {
		Object.keys(themes).forEach((key) => {
			if (key !== theme) return;
			let lightness: 'dark' | 'light' = 'dark';

			const lightnessValue = themes[key as keyof typeof themes].bgNormal.split('(')[1].split(' ')[0];
			if (parseFloat(lightnessValue) > 0.5) lightness = 'light';

			setColorVariables(lightness, themes[key as keyof typeof themes]);
		});
	}, [theme]);
}

function setColorVariables(lightness: 'dark' | 'light', { bgDark, bgNormal, bgLight, textMain, textMuted, border }: Record<string, string>) {
	document.documentElement.style.setProperty('--bg-dark', bgDark);
	document.documentElement.style.setProperty('--bg-base', bgNormal);
	document.documentElement.style.setProperty('--bg-light', bgLight);
	document.documentElement.style.setProperty('--text-main', textMain);
	document.documentElement.style.setProperty('--text-muted', textMuted);
	document.documentElement.style.setProperty('--border', border);

	let accent = lightness == 'dark' ? 'oklch(0.6802 0.1606 278.08)' : 'oklch(0.4296 0.1606 278.08)';
	let accentMuted = lightness == 'dark' ? 'oklch(0.3296 0.0529 280.15)' : 'oklch(0.8002 0.0529 280.15)';

	document.documentElement.style.setProperty('--accent', accent);
	document.documentElement.style.setProperty('--accent-muted', accentMuted);
}
