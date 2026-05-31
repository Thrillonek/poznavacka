import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { getPoznavackaFiles } from './functions/getPoznavackaFiles.ts';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	define: {
		__FILE_SYSTEM__: JSON.stringify(getPoznavackaFiles('./public/assets/poznavacky')),
	},
	resolve: {
		alias: {
			src: '/src',
			public: '/public',
			root: './',
		},
	},
});
