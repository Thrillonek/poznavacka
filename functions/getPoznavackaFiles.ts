import fs from 'fs';

function sortingAlg(a, b) {
	if (/\d/.test(a.slice(0, 3)) && /\d/.test(b.slice(0, 3))) {
		return parseInt(a.replace(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, ''));
	}
	return a - b;
}

export function getPoznavackaFiles(dir) {
	var results = [];

	fs.readdirSync(dir)
		.sort(sortingAlg)
		.forEach((file) => {
			file = dir + '/' + file;
			var stat = fs.statSync(file);

			if (stat && stat.isDirectory()) {
				let fileSctructure = file.split('/');
				results.push({ [fileSctructure[fileSctructure.length - 1]]: getPoznavackaFiles(file) });
			} else results.push(file.slice(8)); // soubor bez ./public složky v názvu
		});

	return results;
}
