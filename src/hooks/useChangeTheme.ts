import { useEffect } from 'react';

export function useChangeTheme(theme: string) {
	useEffect(() => {
		if (theme == 'dark') {
			setColorVariables('dark', {
				bgDark: 'oklch(0.1822 0 0)',
				bgNormal: 'oklch(0.2178 0 0)',
				bgLight: 'oklch(0.2603 0 0)',
				textMain: 'oklch(0.9491 0 0)',
				textMuted: 'oklch(0.6993 0 0)',
				border: 'oklch(0.4017 0 0)',
			});
		}

		if (theme == 'light') {
			setColorVariables('light', {
				bgDark: 'oklch(0.92 0 264)',
				bgNormal: 'oklch(0.96 0 264)',
				bgLight: 'oklch(1 0 264)',
				textMain: 'oklch(0.15 0 264)',
				textMuted: 'oklch(0.4 0 264)',
				border: 'oklch(0.6 0 264)',
			});
		}

		if (theme == 'ULTRALIGHT') {
			setColorVariables('light', {
				bgDark: 'oklch(1 0 264)',
				bgNormal: 'oklch(1 0 264)',
				bgLight: 'oklch(1 0 264)',
				textMain: 'oklch(0 0 264)',
				textMuted: 'oklch(0 0 264)',
				border: 'oklch(1 0 264)',
			});
		}
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
