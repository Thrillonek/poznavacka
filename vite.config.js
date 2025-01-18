import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';
//import usePHP from 'vite-plugin-php';

let poznavacky = {};
let path = './public/assets';
const dir = fs.readdirSync(path).filter((f) => !f.includes('.'));

function sortingAlg(a, b) {
	if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
		return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
	}
	return a - b;
}

// dir.forEach((f) => {
// 	path = `./public/assets/${f}`;
// 	const files = fs.readdirSync(path).sort(sortingAlg);
// 	while (files.some((f) => !f.includes('.'))) {
// 		let folder = files.find((f) => !f.includes('.'));
// 		console.log(folder, f);
// 		let newFiles;
// 		try {
// 			newFiles = fs.readdirSync(`./public/assets/${f}/${folder}`).sort(sortingAlg);
// 		} catch (err) {
// 			console.log(err);
// 			break;
// 		}

// 		newFiles && files.splice(files.indexOf(folder), 1, { [`${folder}`]: [...newFiles] });
// 	}
// 	poznavacky[f] = files;
// });

function getFS(dir) {
	var results = [];

	fs.readdirSync(dir)
		.sort(sortingAlg)
		.forEach((file) => {
			file = dir + '/' + file;
			var stat = fs.statSync(file);

			if (stat && stat.isDirectory()) {
				let fileSctructure = file.split('/');
				results.push({ [fileSctructure[fileSctructure.length - 1]]: getFS(file) });
			} else results.push(file.slice(8)); // soubor bez ./public složky v názvu
		});

	return results;
}

// fs.writeFileSync('./public/files.txt', JSON.stringify(getFS('./public/assets/poznavacky')));

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
		__DIR__: JSON.stringify(getFS('./public/assets/poznavacky')),
	},
});
