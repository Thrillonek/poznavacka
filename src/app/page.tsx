import { BrowserRouter as Router } from 'react-router';
import 'src/assets/_main.scss';
import { getPoznavackaFilesAsync } from '../../functions/getPoznavackaFiles';
import App from './routes/App';

export default async function Page() {
	const fileSystem = await getPoznavackaFilesAsync('./public/assets/poznavacky');

	return (
		<Router>
			<App fileSystem={fileSystem} />
		</Router>
	);
}
