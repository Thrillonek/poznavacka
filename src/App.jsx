import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Test from './Test.jsx';

export default function App() {
	const [poznavacka, setPoznavacka] = useState();
	const [showingContent, setShowingContent] = useState();
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		let interval = setInterval(() => {
			let num = Math.floor(Math.random() * 1000) + 1;
			if (num == 500) {
				document.getElementById('jumpscare').animate({ transform: ['scale(0)', 'scale(.5)', 'scale(.6)', 'scale(.6)', 'scale(5)'] }, { duration: 1000 });
				clearInterval(interval);
			}
		}, 3 * 1000);
		const cookie = Cookies.get('poznavacka');
		if (cookie) {
			setPoznavacka(cookie);
			setShowingContent(true);
		} else {
			setPoznavacka('rostliny');
		}
		axios
			.get('/api/index')
			.then((res) => {
				if (loaded == 'block') return;
				setLoaded(true);
				if (res.data.session) {
					setPoznavacka(res.data.session);
					setShowingContent(true);
				} else {
					setPoznavacka('rostliny');
				}
			})
			.catch((err) => {
				setPoznavacka('rostliny');
				console.error(err.response.data.error);
			});

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let data = poznavacka;
		if (!showingContent) data = '';
		Cookies.set('poznavacka', data);
		axios
			.post('/api/index', {
				poznavacka: data,
			})
			.catch((err) => console.error(err.response.data.message));
	}, [poznavacka, showingContent]);

	function showContent(pozn) {
		setPoznavacka(pozn);
		setShowingContent(true);
	}

	if (!poznavacka) return;
	return (
		<Router>
			<div onClick={(e) => setLoaded('block')} className='relative flex flex-col items-center bg-gray-700 w-screen h-dvh overflow-y-hidden'>
				<Routes>
					<Route
						path=''
						element={
							<>
								<div style={{ pointerEvents: 'none' }} className='z-30 fixed flex justify-center items-center w-full h-full'>
									<img id='jumpscare' className='h-min scale-0' src='https://gkh.cz/wp-content/uploads/2022/05/jac.jpg' alt='JANEC' />
								</div>
								<div className={'absolute h-full z-10 w-full translate-y-full transition-transform duration-500 flex flex-col ' + (showingContent && '!translate-y-0')}>
									<div onClick={(e) => setShowingContent(false)} className='border-gray-500 bg-[rgb(45,55,71)] p-1 border-b w-full text-gray-400 cursor-pointer'>
										<span className='ml-2'>
											<i className='fa-arrow-left mr-1 fa-solid'></i>Zpět na výběr
										</span>
									</div>
									<div className='flex-grow'>
										<Home poznavacka={poznavacka} />
									</div>
								</div>
								<div className='relative z-0 flex flex-col px-10 w-full'>
									<div className={'top-0 transition-transform absolute bg-gray-700 shadow-[0_0_30px_0_rgb(0,0,0,0.5)] px-4 py-2 rounded-b-xl font-bold text-center text-gray-400 self-center ' + (loaded && '-translate-y-[150%]')}>
										Načítám cookies... <span className='block font-normal text-[.7rem]'>Jakoukoli akcí toto zastavíte</span>
									</div>
									<h1 className='mt-10 mb-5 font-bold text-3xl text-gray-200'>Vyber poznávačku:</h1>
									{['rostliny', 'houby', 'prvoci'].map((content) => {
										return (
											<button onClick={(e) => showContent(content)} className='bg-gray-600 m-5 py-10 rounded-xl w-[90%] font-bold text-5xl text-gray-300 self-center'>
												{content.charAt(0).toUpperCase() + content.slice(1)}
											</button>
										);
									})}
								</div>
							</>
						}
					/>
					<Route path='pisemka' element={<Test />} />
				</Routes>
			</div>
		</Router>
	);
}
