import { load } from 'cheerio';
import cors from 'cors';
import express from 'express';
import fs from 'fs';

const app = express();

const path = './x-slides';
let arr = [];
let count = 0;
let files = fs.readdirSync(path);

app.use(express.static('./dist'));
app.use(cors());
app.use(express.json());

//* XML READ TESTER
for (const file of files.sort((a, b) => a.replaceAll(/\D/g, '') - b.replaceAll(/\D/g, ''))) {
	let content = fs.readFileSync(path + '/' + file);
	let $ = load(content, { xml: true });
	if ($('p\\:pic').length > 0) {
		count += $('p\\:pic').length;
		continue;
	}
	$(`p\\:sp`).each((idx, item) => {
		let itemA = item?.children.find((i) => i.name == 'p:nvSpPr');
		let itemB = itemA?.children.find((i) => i.name == 'p:cNvPr');
		let attr = itemB?.attributes.find((i) => i.name == 'name');
		if (!attr.value.toLowerCase().includes('nadpis')) return;

		let itemC = item?.children.find((i) => i.name == 'p:txBody');
		let itemD = itemC?.children.find((i) => i.name == 'a:p');
		let itemE = itemD?.children.find((i) => i.name == 'a:r');
		let targetItem = itemE?.children.find((i) => i.name == 'a:t');
		arr.push(count + ": '" + targetItem?.children?.[0].data + "'");
	});
}

fs.writeFileSync('./public/nadpisy.txt', `${arr.join(',\n')}`, 'utf8');

//* XML (PREZENTACE) SCANNER
// let plus = 0;
// let count = 0;
// let currentTitle = '';
// for (const file of files.sort((a, b) => a.replaceAll(/\D/g, '') - b.replaceAll(/\D/g, ''))) {
// 	let content = fs.readFileSync(path + '/' + file);
// 	let $ = load(content, { xml: true });
// 	let num = file.replaceAll(/\D/g, '');
// 	// count += $('p\\:pic').length;
// 	if ($('p\\:pic').length > 0) continue;
// 	$(`p\\:sp`).each((idx) => {
// 		console.log(idx + ':' + $(this).text());
// 	});
// 	break;

// $(`a\\:t`).each((idx, item) => {
// 	item.children.forEach((el) => {
// 		let { data } = el;
// 		currentTitle = data;
// 		if (idx > 0) plus += 1;
// 		for (let i = 0; i < $('p\\:pic').length; i++) {
// 			arr.push(data);
// 		}
// 	});
// });

// for (let i = 0; i < $('p\\:pic').length; i++) {
// 	arr.push(currentTitle);
// }
// }
// fs.writeFileSync('./public/hmyz.txt', `${arr.join(',\n')}`, 'utf8');
// console.log(count);

//* WRITING/RENAMING SYSTEM
// let content = fs.readFileSync('./public/hmyz.txt', 'utf-8');
// let arr = content.split(',\n');

// let first = [];
// let used = [];

// for (const i of arr) {
// 	if (first.includes(i)) {
// 		used.push(i);
// 		continue;
// 	}
// 	first.push(i);
// }

// console.log(used);

// let p = './public/assets/poznavacky/SEXTA/hmyz';
// let files = fs.readdirSync(p).sort((a, b) => a.replaceAll(/\D/g, '') - b.replaceAll(/\D/g, ''));
// console.log(files.length);
// let newFiles = files.map((f) => f.replaceAll(/\d/g, ''));
// for (const idx in files) {
// fs.rename(`${p}/` + files[idx], `${p}/${parseInt(idx) + 1}${arr[idx].replaceAll(/\d/g, '')}.png`, (err) => err && console.log(err));
// if (idx < 20) {
// 	console.log(`${p}/${parseInt(idx) + 1}${arr[idx].replaceAll(/\d/g, '')}`);
// }
// }

//* FILE SCANNER (SROVNÁVÁ VÝSLEDKY)
// let myfiles = fs.readFileSync('./public/moje.txt', 'utf-8').split('\n');
// let files = fs.readFileSync('./public/test.txt', 'utf-8').split('\n');

// for (const file of files) {
// 	if (myfiles.includes(file)) continue;
// 	console.log(file);
// }

//* BACKEND (NEVYUŽITÝ)
app.get('/', (req, res) => {
	res.sendFile('./dist/index.html');
});

app.post('/test', (req, res) => {
	console.log(req.body);
	res.send('ok');
});

//app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));
