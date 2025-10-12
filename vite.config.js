import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { getPoznavackaFiles } from './functions/getPoznavackaFiles.js';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		__FILE_SYSTEM__: JSON.stringify(getPoznavackaFiles('./public/assets/poznavacky')),
	},
	resolve: {
		alias: {
			'@': '/src',
			public: '/public',
		},
	},
});
