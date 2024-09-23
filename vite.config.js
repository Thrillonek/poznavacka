import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';

let path = './public/assets/rostliny';
const rostliny = fs.readdirSync(path).sort((a, b) => parseInt(a.replaceAll(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
path = './public/assets/houby';
const houby = fs.readdirSync(path).sort((a, b) => parseInt(a.replaceAll(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		__ROSTLINY__: JSON.stringify(rostliny),
		__HOUBY__: JSON.stringify(houby),
	},
});
