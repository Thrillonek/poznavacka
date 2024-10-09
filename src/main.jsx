import { Analytics } from '@vercel/analytics/react';
import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

axios.defaults.baseURL = '';

ReactDOM.createRoot(document.getElementById('root')).render(
	<>
		<App />
		<Analytics />
	</>
);
