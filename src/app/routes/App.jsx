import Home from '@/components/Home.jsx';
import MenuBar from '@/features/file-system/components/MenuBar.jsx';
import Sidebar from '@/features/file-system/components/Sidebar.jsx';

export default function App() {
	// useEffect(() => {
	// 	let stopPropagation = false;

	// 	let interval = setInterval(() => {
	// 		let num = Math.floor(Math.random() * 500) + 1;
	// 		if (num == 20) {
	// 			document.getElementById('jumpscare').animate({ transform: ['scale(0)', 'scale(.5)', 'scale(.6)', 'scale(.6)', 'scale(5)'] }, { duration: 1000 });
	// 		}
	// 	}, 3 * 1000);
	// 	const cookie = Cookies.get('poznavacka');
	// 	if (cookie) {
	// 		setPoznavacka(cookie);
	// 		setShowingContent(true);
	// 		setLoaded('block');
	// 		stopPropagation = true;
	// 	} else {
	// 		setPoznavacka('houby');
	// 	}

	// 	axios
	// 		.get('/api/index')
	// 		.then((res) => {
	// 			setLoaded(true);
	// 			if (res.data.colors) {
	// 				for (const color of res.data.colors) {
	// 					if (color.value) {
	// 						document.querySelector(':root').style.setProperty(color.name, color.value);
	// 						document.getElementById(color.name).value = color.value;
	// 					}
	// 				}
	// 			}
	// 			if (res.data.poznavacka) {
	// 				setPoznavacka(res.data.poznavacka);
	// 				setShowingContent(true);
	// 			} else {
	// 				if (!stopPropagation) setPoznavacka('houby');
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			if (!stopPropagation) setPoznavacka('houby');
	// 			console.error(err.response.data.error);
	// 		});

	// 	return () => clearInterval(interval);
	// }, []);

	// useEffect(() => {
	// 	let data = poznavacka;
	// 	if (!showingContent) data = '';
	// 	Cookies.set('poznavacka', data);
	// 	axios
	// 		.post('/api/index', {
	// 			poznavacka: data,
	// 		})
	// 		.catch((err) => console.error(err.response.data.message));
	// }, [poznavacka, showingContent]);

	return (
		<>
			<main className={'relative h-screen bg-[--bg-main] z-0 w-full flex flex-col'}>
				<div className='relative flex flex-grow'>
					<Sidebar />
					<div className='max-md:z-0 flex flex-col flex-grow'>
						<MenuBar />
						<div className='flex-grow'>
							<Home />
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
