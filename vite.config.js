import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
//import usePHP from 'vite-plugin-php';

let poznavacky = {};
let path = './public/assets';
const dir = fs.readdirSync(path).filter((f) => !f.includes('.'));

dir.forEach((f) => {
	path = `./public/assets/${f}`;
	const files = fs.readdirSync(path).sort((a, b) => {
		if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
			return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
		}
		return a - b;
	});
	poznavacky[f] = files;
});

// const rostliny = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
// path = './public/assets/houby';
// const houby = fs.readdirSync(path).sort((a, b) => {
// 	if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
// 		return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
// 	}
// 	return a - b;
// });
// path = './public/assets/prvoci';
// const prvoci = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
// path = './public/assets/prvousti';
// const prvousti = fs
// 	.readdirSync(path)
// 	.sort((a, b) => {
// 		if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
// 			return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
// 		}
// 		return a - b;
// 	})
// 	.filter((f) => !f.endsWith('.db'));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		__DIR__: JSON.stringify(poznavacky),
	},
});
