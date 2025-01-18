import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Home.jsx';
import Test from './Test.jsx';
import { dir } from './utilities.js';

export default function App() {
	const [poznavacka, setPoznavacka] = useState();
	const [showingContent, setShowingContent] = useState();
	const [loaded, setLoaded] = useState(false);

	// axios.defaults.baseURL = 'http://localhost:8080';

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
	// 		// setPoznavacka('houby');
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

	function showContent(pozn) {
		setPoznavacka(pozn);
		// if (window.innerWidth < 768) setShowingContent(true);
	}

	function loadColors(e, preset) {
		document.querySelector(':root').style.setProperty('--color-scale', 0);

		if (preset) {
			let hexCodes = [];
			if (preset == 'default') hexCodes = ['#9ca3af', '#c8cddc', '#374151', '#697387', '#4b505f'];
			if (preset == 'pink') hexCodes = ['#99244F', '#B92D5D', '#EE719E', '#F4A4C0', '#F4A4C0'];
			let vars = ['--text-main', '--text-bright', '--bg-main', '--bg-secondary', '--bg-bright'];
			for (const v in vars) {
				document.querySelector(':root').style.setProperty(vars[v], hexCodes[v]);
			}

			document.querySelectorAll('.color-picker')?.forEach((el) => {
				const color = getComputedStyle(root).getPropertyValue(el.id);
				el.value = color;
			});
		}
		let colors = [];
		document.querySelectorAll('.color-picker')?.forEach((el) => {
			colors.push({ name: el.id, value: el.value });
			if (el.value && !preset) document.querySelector(':root').style.setProperty(el.id, el.value);
		});
		axios
			.post('/api/index', {
				colors,
			})
			.catch((err) => console.error(err.response.data.message));
	}

	var isObject = (x) => typeof x === 'object' && !Array.isArray(x) && x !== null;

	return (
		<Router>
			<div onClick={(e) => setLoaded('block')} className='relative flex flex-col items-center bg-[--bg-main] w-screen h-dvh overflow-y-hidden'>
				<Routes>
					<Route
						path=''
						element={
							<>
								{/* COLOR PICKER */}
								<div className='top-6 right-6 z-20 fixed flex flex-col border-[--bg-secondary] bg-[--bg-main] p-5 border rounded-xl w-[min(80%,300px)] origin-top-right transition-transform scale-[--color-scale]'>
									<i onClick={(e) => document.querySelector(':root').style.setProperty('--color-scale', 0)} className='top-3 right-4 absolute text-[--text-main] text-lg cursor-pointer fa-solid fa-xmark' />
									<h2 className='text-[--text-bright] mb-2 font-bold text-xl'>Změnit barvy</h2>
									<p className='text-[--text-bright] mt-2 mb-1 font-semibold text-lg'>Text</p>
									<input defaultValue={getComputedStyle(root).getPropertyValue('--text-main')} id='--text-main' className='bg-[--bg-bright] my-1 rounded w-full color-picker outline-none' type='color' />
									<p className='text-[--text-bright] mt-2 mb-1 font-semibold text-lg'>Výrazný text</p>
									<input defaultValue={getComputedStyle(root).getPropertyValue('--text-bright')} id='--text-bright' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 rounded w-full color-picker outline-none' type='color' />
									<p className='text-[--text-bright] mt-2 mb-1 font-semibold text-lg'>Pozadí</p>
									<input defaultValue={getComputedStyle(root).getPropertyValue('--bg-main')} id='--bg-main' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 rounded w-full color-picker outline-none' type='color' />
									<p className='text-[--text-bright] mt-2 mb-1 font-semibold text-lg'>Vedlejší</p>
									<input defaultValue={getComputedStyle(root).getPropertyValue('--bg-secondary')} id='--bg-secondary' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 rounded w-full color-picker outline-none' type='color' />
									<p className='text-[--text-bright] mt-2 mb-1 font-semibold text-lg'>Výrazné pozadí</p>
									<input defaultValue={getComputedStyle(root).getPropertyValue('--bg-bright')} id='--bg-bright' className='bg-[--bg-bright] text-[--text-bright] caret-[--bg-secondary] my-1 rounded w-full color-picker outline-none' type='color' />
									<button onClick={loadColors} className='bg-blue-500 mt-6 p-1 rounded font-bold text-white'>
										Potvrdit
									</button>
									<h2 className='text-[--text-bright] mt-2 font-semibold text-lg'>Předvolby:</h2>
									<button onClick={(e) => loadColors(e, 'default')} className='border-gray-400 mt-2 p-1 border rounded font-semibold text-gray-400'>
										Výchozí
									</button>
									<button onClick={(e) => loadColors(e, 'pink')} className='border-pink-500 bg-pink-400 mt-2 p-1 border rounded font-semibold text-red-700'>
										Růžová
									</button>
								</div>
								{/* JUMPSCARE */}
								<div style={{ pointerEvents: 'none' }} className='z-30 fixed flex justify-center items-center w-full h-full'>
									<img id='jumpscare' className='h-min scale-0' src='https://gkh.cz/wp-content/uploads/2022/05/jac.jpg' alt='JANEC' />
								</div>
								<div onClick={(e) => e.target.id != 'show-colors' && document.querySelector(':root').style.setProperty('--color-scale', 0)} className={'relative h-full bg-[--bg-main] z-0 w-full flex flex-col'}>
									{/* COOKIES LOADING */}
									<div className={'top-0 transition-transform absolute bg-[--bg-main] shadow-[0_0_30px_0_rgb(0,0,0,0.5)] px-4 py-2 rounded-b-xl font-bold text-center text-[--text-main] self-center ' + (loaded && '-translate-y-[150%]')}>
										Načítám cookies... <span className='block font-normal text-[.7rem]'>Jakoukoli akcí toto zastavíte</span>
									</div>
									{/* TOP BAR */}
									<div className='z-10 flex justify-between items-center border-[--bg-secondary] bg-[--bg-main] shadow-lg px-2 py-1 border-b w-full text-[--text-main]'>
										<i onClick={(e) => setShowingContent(!showingContent)} className={'px-2 text-2xl cursor-pointer fa-solid ' + (showingContent ? 'fa-bars' : 'fa-xmark')}></i>
										<i onClick={(e) => document.querySelector(':root').style.setProperty('--color-scale', 1)} id='show-colors' className='px-2 text-[--text-main] text-xl cursor-pointer fa-palette fa-solid'></i>
									</div>
									<div className='relative z-0 flex flex-grow'>
										{/* MENU */}
										<div className={'z-10 bg-[--bg-main] max-md:w-full md:relative absolute pt-4 transition-all duration-300 ease-in-out md:border-r border-[--bg-secondary] inset-0 overflow-hidden box-border w-[min(100%,18rem)] grid grid-cols-1 ' + (showingContent && 'max-md:-translate-x-full md:!w-0 !border-0')}>
											<div className='px-4'>
												{/* <h1 className='text-[--text-bright] my-4 font-bold text-4xl tracking-wide'>Poznávačky:</h1> */}
												{dir
													.filter((content) => isObject(content))
													.map((content) => {
														return (
															<button onClick={(e) => showContent(content)} className={'text-[--text-main] flex items-center my-2 text-4xl ' + (poznavacka == content && 'font-semibold !text-[--text-bright]')}>
																{/* <i className='fa-arrow-right mr-6 text-3xl fa-solid'></i> */}
																{Object.keys(content)[0].charAt(0).toUpperCase() + Object.keys(content)[0].slice(1)}
															</button>
														);
													})}
											</div>
										</div>
										{/* MAIN CONTENT */}
										{poznavacka && (
											<div className='z-0 flex-grow'>
												<Home poznavacka={poznavacka} />
											</div>
										)}
									</div>
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
