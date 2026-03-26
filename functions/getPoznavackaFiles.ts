// @ts-ignore
import fs from 'fs';

function sortingAlg(a: any, b: any) {
	if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
		return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
	}
	return a - b;
}

export function getPoznavackaFiles(dir: string) {
	var results: (string | Record<string, any>)[] = [];

	fs.readdirSync(dir)
		.sort(sortingAlg)
		.forEach((file: string) => {
			file = dir + '/' + file;
			var stat = fs.statSync(file);

			if (stat && stat.isDirectory()) {
				let fileSctructure = file.split('/');
				results.push({ [fileSctructure[fileSctructure.length - 1]]: getPoznavackaFiles(file) });
			} else results.push(file.slice(8)); // soubor bez ./public složky v názvu
		});

	return results;
}

export async function getPoznavackaFilesAsync(dir: string) {
	'use server';
	return new Promise((resolve) => resolve(getPoznavackaFiles(dir)));
}
