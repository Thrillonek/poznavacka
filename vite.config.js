import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
//import usePHP from 'vite-plugin-php';

let path = './public/assets/rostliny';
const rostliny = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
path = './public/assets/houby';
const houby = fs.readdirSync(path).sort((a, b) => {
	if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
		return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
	}
	return a - b;
});
path = './public/assets/prvoci';
const prvoci = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
path = './public/assets/prvousti';
const prvousti = fs
	.readdirSync(path)
	.sort((a, b) => {
		if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
			return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
		}
		return a - b;
	})
	.filter((f) => !f.endsWith('.db'));

// https://vitejs.dev/config/
export default defineConfig({
	base: './',
	plugins: [react()],
	define: {
		__ROSTLINY__: JSON.stringify(rostliny),
		__HOUBY__: JSON.stringify(houby),
		__PRVOCI__: JSON.stringify(prvoci),
		__PRVOUSTI__: JSON.stringify(prvousti),
	},
});
