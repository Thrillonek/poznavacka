import { load } from 'cheerio';
import cors from 'cors';
import express from 'express';
import fs from 'fs';

const app = express();

const path = './public/test';

app.use(express.static('./dist'));
app.use(cors());
app.use(express.json());

// let files = fs.readdirSync(path);
// let plus = 0;
// let arr = [];
// for (const file of files.sort((a, b) => a.replaceAll(/\D/g, '') - b.replaceAll(/\D/g, ''))) {
// 	let content = fs.readFileSync(path + '/' + file);
// 	let $ = load(content, { xml: true });
// 	let num = file.replaceAll(/\D/g, '');
// 	$(`a\\:t`).each((idx, item) => {
// 		item.children.forEach((el) => {
// 			let { data } = el;
// 			if (idx > 0) plus += 1;
// 			arr.push(data);
// 		});
// 	});
// }
// fs.writeFileSync('./public/text.txt', `${arr}`, 'utf8');

let content = fs.readFileSync('./public/text.txt', 'utf-8');
let arr = content.split(',\n');

let files = fs.readdirSync('./public/assets/houby').sort((a, b) => a.replaceAll(/\D/g, '') - b.replaceAll(/\D/g, ''));
for (const idx in files) {
	fs.rename('./public/assets/houby/' + files[idx], './public/assets/houby/' + (parseInt(idx) + 1) + arr[idx] + '.png', (err) => err && console.log(err));
}

app.get('/', (req, res) => {
	res.sendFile('./dist/index.html');
});

app.post('/test', (req, res) => {
	console.log(req.body);
	res.send('ok');
});

//app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));
