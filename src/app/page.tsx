'use client';

import dynamic from 'next/dynamic';
import 'src/assets/_main.scss';
import { AppProvider } from './provider';

const ClientApp = dynamic(() => import('./ClientApp'), {
	ssr: false,
});

const App = () => {
	return (
		<AppProvider>
			<ClientApp />
		</AppProvider>
	);
};

export default App;
