import react from '@vitejs/plugin-react';
import fs from 'fs';
import { defineConfig } from 'vite';

const path = './public/assets/img';
const files = fs.readdirSync(path);

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	define: {
		__FILES__: JSON.stringify(files),
	},
});
