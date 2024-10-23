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

	// axios.defaults.baseURL = 'http://localhost:8080';

	useEffect(() => {
		let interval = setInterval(() => {
			let num = Math.floor(Math.random() * 500) + 1;
			if (num == 250) {
				document.getElementById('jumpscare').animate({ transform: ['scale(0)', 'scale(.5)', 'scale(.6)', 'scale(.6)', 'scale(5)'] }, { duration: 1000 });
				clearInterval(interval);
			}
		}, 3 * 1000);
		const cookie = Cookies.get('poznavacka');
		if (cookie) {
			setPoznavacka(cookie);
			setShowingContent(true);
			setLoaded('block');
		} else {
			setPoznavacka('rostliny');
		}
		axios
			.get('/api/index')
			.then((res) => {
				if (loaded == 'block') return;
				setLoaded(true);
				console.log('session: ' + res.data);
				if (res.data.session.poznavacka) {
					setPoznavacka(res.data.session.poznavacka);
					setShowingContent(true);
				} else {
					setPoznavacka('rostliny');
				}
			})
			.catch((err) => {
				if (loaded != 'block') setPoznavacka('rostliny');
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

	function loadColors() {
		let colors = [];
		document.querySelectorAll('.color-picker')?.forEach((el) => {
			colors.push({ name: el.id, value: el.value });
			if (el.value) document.querySelector(':root').style.setProperty(el.id, el.value);
		});
		axios
			.post('/api/index', {
				colors,
			})
			.catch((err) => console.error(err.response.data.message));
	}

	if (!poznavacka) return;
	return (
		<Router>
			<div onClick={(e) => setLoaded('block')} className='relative flex flex-col items-center bg-[--bg-main] w-screen h-dvh overflow-y-hidden'>
				<Routes>
					<Route
						path=''
						element={
							<>
								<div style={{ pointerEvents: 'none' }} className='z-30 fixed flex justify-center items-center w-full h-full'>
									<img id='jumpscare' className='h-min scale-0' src='https://gkh.cz/wp-content/uploads/2022/05/jac.jpg' alt='JANEC' />
								</div>
								<div className={'absolute h-full bg-[--bg-main] z-10 w-full translate-y-full transition-transform duration-500 flex flex-col ' + (showingContent && '!translate-y-0')}>
									<div onClick={(e) => setShowingContent(false)} className='border-[--text-main] bg-black bg-opacity-10 p-1 border-b w-full text-[--text-main] cursor-pointer'>
										<span className='ml-2'>
											<i className='fa-arrow-left mr-1 fa-solid'></i>Zpět na výběr
										</span>
									</div>
									<div className='flex-grow'>
										<Home poznavacka={poznavacka} />
									</div>
								</div>
								<div className='relative z-0 flex flex-col px-10 w-full'>
									<i onClick={(e) => document.querySelector(':root').style.setProperty('--color-scale', 1)} className='top-6 right-6 absolute text-[--text-main] text-xl cursor-pointer fa-palette fa-solid'></i>
									<div className='top-6 right-6 absolute flex flex-col border-[--bg-secondary] bg-[--bg-main] p-5 border rounded-xl scale-[--color-scale]'>
										<i onClick={(e) => document.querySelector(':root').style.setProperty('--color-scale', 0)} className='top-4 right-4 absolute text-[--text-main] text-lg fa-solid fa-xmark' />
										<p className='text-[--text-bright] mt-2 mb-1'>Text</p>
										<input id='--text-main' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 p-1 rounded color-picker outline-none' type='text' />
										<p className='text-[--text-bright] mt-2 mb-1'>Výrazný text</p>
										<input id='--text-bright' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 p-1 rounded color-picker outline-none' type='text' />
										<p className='text-[--text-bright] mt-2 mb-1'>Pozadí</p>
										<input id='--bg-main' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 p-1 rounded color-picker outline-none' type='text' />
										<p className='text-[--text-bright] mt-2 mb-1'>Vedlejší</p>
										<input id='--bg-secondary' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 p-1 rounded color-picker outline-none' type='text' />
										<p className='text-[--text-bright] mt-2 mb-1'>Výrazné pozadí</p>
										<input id='--bg-bright' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 p-1 rounded color-picker outline-none' type='text' />
										<button onClick={loadColors} className='bg-blue-500 mt-6 p-1 rounded font-bold text-white'>
											Potvrdit
										</button>
									</div>
									<div className={'top-0 transition-transform absolute bg-[--bg-main] shadow-[0_0_30px_0_rgb(0,0,0,0.5)] px-4 py-2 rounded-b-xl font-bold text-center text-[--text-main] self-center ' + (loaded && '-translate-y-[150%]')}>
										Načítám cookies... <span className='block font-normal text-[.7rem]'>Jakoukoli akcí toto zastavíte</span>
									</div>
									<h1 className='text-[--text-bright] mt-10 mb-5 font-extrabold text-3xl'>Vyber poznávačku:</h1>
									{['rostliny', 'houby', 'prvoci'].map((content) => {
										return (
											<button onClick={(e) => showContent(content)} className='bg-[--bg-bright] text-[--text-bright] m-5 py-10 rounded-xl w-[90%] font-bold text-5xl self-center'>
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
