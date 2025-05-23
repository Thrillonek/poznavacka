/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			boxShadow: {
				round: '0px 0px 10px 0px rgb(0,0,0,0.3)',
			},
		},
	},
	plugins: [],
};
