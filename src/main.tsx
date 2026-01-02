import React from 'react';
import ReactDOM from 'react-dom/client';
import 'src/assets/tailwindInit.css';
import { App } from './app/index.jsx';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
