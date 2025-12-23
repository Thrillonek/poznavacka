import { useEffect } from 'react';
import { themes } from 'src/data/themes';

export function useChangeTheme(colorPicker: Record<string, string | number>) {
	useEffect(() => {
		if (colorPicker.preset === 'custom') {
			setColorVariables('dark', {
				bgDark: `oklch(0.18 ${(colorPicker.chroma as number) / 1000} ${colorPicker.hue})`,
				bgNormal: `oklch(0.22 ${(colorPicker.chroma as number) / 1000} ${colorPicker.hue})`,
				bgLight: `oklch(0.26 ${(colorPicker.chroma as number) / 1000} ${colorPicker.hue})`,
				textMain: `oklch(0.95 ${(colorPicker.chroma as number) / 1000} ${colorPicker.hue})`,
				textMuted: `oklch(0.7 ${(colorPicker.chroma as number) / 1000} ${colorPicker.hue})`,
				border: `oklch(0.4 ${(colorPicker.chroma as number) / 500} ${colorPicker.hue})`,
			});
		} else {
			Object.keys(themes).forEach((key) => {
				if (key !== colorPicker.preset) return;
				let lightness: 'dark' | 'light' = 'dark';

				const lightnessValue = themes[key as keyof typeof themes].bgNormal.split('(')[1].split(' ')[0];
				if (parseFloat(lightnessValue) > 0.5) lightness = 'light';

				setColorVariables(lightness, themes[key as keyof typeof themes]);
			});
		}
	}, [colorPicker]);
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
