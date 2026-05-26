import { BrowserRouter as Router } from 'react-router';
import 'src/assets/_main.scss';
import App from './routes/App';

export default async function Page() {
	return (
		<Router>
			<App />
		</Router>
	);
}
