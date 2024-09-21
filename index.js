import cors from 'cors';
import express from 'express';
import fs from 'fs';

const app = express();

const path = './public/assets';

app.use(express.static('./dist'));
app.use(cors());

app.get('/', (req, res) => {
	res.sendFile('./dist/index.html');
});

app.get('/files', (req, res) => {
	const files = fs.readdirSync(path).sort((a, b) => parseInt(a.replaceAll(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')));
	res.json({ files: files });
});

app.listen(process.env.PORT || 3000, () => console.log('http://localhost:3000'));
