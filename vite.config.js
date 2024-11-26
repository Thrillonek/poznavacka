import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
//import usePHP from 'vite-plugin-php';

let path = './public/assets/rostliny';
// const rostliny = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
path = './public/assets/houby';
const houby = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
path = './public/assets/prvoci';
const prvoci = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
path = './public/assets/prvousti';
const prvousti = fs.readdirSync(path).sort((a, b) => parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		// __ROSTLINY__: JSON.stringify(rostliny),
		__HOUBY__: JSON.stringify(houby),
		__PRVOCI__: JSON.stringify(prvoci),
		__PRVOUSTI__: JSON.stringify(prvousti),
	},
});
