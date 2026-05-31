/** @type {import('next').NextConfig} */

import type { NextConfig } from 'next';
import { getPoznavackaFiles } from './functions/getPoznavackaFiles.ts';

const nextConfig: NextConfig = {
	// output: 'export', // Outputs a Single-Page Application (SPA).
	distDir: './dist', // Changes the build output directory to `./dist/`.
	env: {
		// Next.js injects this string value at build time
		NEXT_PUBLIC_FILE_SYSTEM: JSON.stringify(getPoznavackaFiles('./public/poznavacky')),
	},
	images: {
		qualities: [75, 50],
	},
	// rewrites: async () => {
	// 	return [
	// 		{
	// 			source: '/*',
	// 			destination: '/',
	// 		},
	// 	];
	// },
};

export default nextConfig;
