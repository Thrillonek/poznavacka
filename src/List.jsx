import { useEffect, useRef, useState } from 'react';
import { categories, set } from './utilities.js';

export default function List({ lock, setLock, poznavacka }) {
	const [chosenFile, setChosenFile] = useState();
	const [category, setCategory] = useState();
	const [showCategories, setShowCategories] = useState();
	const [browseCategories, setBrowseCategories] = useState();
	const [filter, setFilter] = useState('');
	const [scrollY, setScrollY] = useState();

	let files = set[poznavacka];

	window.onkeydown = handleKeyDown;

	useEffect(() => {
		if (poznavacka != 'rostliny') setShowCategories(false);
		document.getElementById('list').scrollTop = 0;
		if (!filter) setChosenFile();
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('opacity-70', !entry.isIntersecting);
					entry.target.classList.toggle('-translate-x-12', !entry.isIntersecting);
				},
				{
					threshold: 1,
				}
			);
		});

		document.querySelectorAll('.plant-list-item')?.forEach((el) => {
			observer.observe(el);
		});

		return () => {
			document.querySelectorAll('.plant-list-item')?.forEach((el) => {
				observer.unobserve(el);
			});
		};
	}, [poznavacka]);

	useEffect(() => {
		let startX, startY, changeX, changeY, startMS;

		let enlarged = document.getElementById('enlarged-img');

		let locked;

		if (chosenFile) {
			enlarged.style.top = `0px`;
			setLock(true);
			let newCategory;
			for (const [key, val] of Object.entries(categories)) {
				if (files.indexOf(chosenFile) >= key - 1) {
					newCategory = val;
				} else break;
			}
			setCategory(newCategory);
		} else {
			setLock(false);
		}

		let handleTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startMS = Date.now();
			locked = true;
		};
		let handleTouchMove = (e) => {
			if (!startX) return;

			let deltaX = e.touches[0].clientX;
			let deltaY = e.touches[0].clientY;
			if (changeY > 50) locked = false;

			changeX = deltaX - startX;
			changeY = deltaY - startY;

			if (!locked) enlarged.style.top = `${changeY >= 0 ? changeY : 0}px`;
		};

		let handleTouchEnd = (e) => {
			if (!chosenFile) return;

			let currentMS = Date.now();

			if (changeY > 200 || Math.abs(startMS - currentMS) < 100) {
				setChosenFile(null);
			} else {
				enlarged.style.top = '0px';
			}

			if (!locked) return;
			changeChosenFile({ left: changeX > 0, right: changeX < 0 });
		};

		document.addEventListener('touchstart', handleTouchStart, { passive: false });
		document.addEventListener('touchmove', handleTouchMove, { passive: false });
		document.addEventListener('touchend', handleTouchEnd);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [chosenFile]);

	useEffect(() => {
		if (!showCategories) setBrowseCategories(false);
	}, [showCategories]);

	function handleKeyDown(e) {
		if (e.key == 'ArrowRight') {
			changeChosenFile({ right: true });
		} else if (e.key == 'ArrowLeft') {
			changeChosenFile({ left: true });
		}
	}

	function handleScroll(e) {
		setScrollY(e.target.scrollTop);
	}

	function changeChosenFile(conditions) {
		let idx = chosenFile && files.indexOf(chosenFile);

		if (conditions.right) {
			idx == files.length - 1 ? (idx = 0) : idx++;
		} else if (conditions.left) {
			idx == 0 ? (idx = files.length - 1) : idx--;
		}

		setChosenFile(files[idx]);
		let rect = document.getElementById('plant-' + idx).getBoundingClientRect();
		let list = document.getElementById('list');
		let listRect = list.getBoundingClientRect();
		list.scrollTop += rect.top - listRect.top - listRect.height / 2;
	}

	function scrollToPlant(e) {
		e.preventDefault();
		if (!filter) return;
		const list = document.getElementById('list');
		let searchTerm = parseInt(filter) - 1;
		if (/\D/.test(filter)) {
			let plant = files.find((f) => {
				let check = false;
				for (const i of prettify(f).toLowerCase().split(' ')) {
					if (i.startsWith(filter.toLowerCase())) check = true;
				}
				return check;
			});
			if (!plant) return;
			searchTerm = files.indexOf(plant);
		}
		let rect = document.getElementById('plant-' + searchTerm).getBoundingClientRect();

		if (browseCategories) {
			for (const [key, val] of Object.entries(categories)) {
				if (val.toLowerCase().startsWith(filter.toLowerCase())) {
					searchTerm = val;
					break;
				}
			}
			rect = document.getElementById('cat-' + searchTerm).getBoundingClientRect();
		}
		list.scrollTo({ top: rect.top + list.scrollTop - list.getBoundingClientRect().top });
	}

	function prettify(str) {
		str = str
			.split('.')[0]
			.replaceAll(/[0-9+_]/g, '')
			.replace('-', ' - ');
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className='relative flex flex-col bg-gray-700 h-full overflow-hidden'>
			{/* Enlarged image carousel */}
			<div id='enlarged-img' className={'translate-y-full left-0 z-40 absolute flex flex-col transition-transform justify-center items-center bg-gray-700 p-3 w-screen h-full ' + (chosenFile && '!translate-y-0')}>
				{!window.matchMedia('(pointer: coarse)').matches && (
					<>
						<div onClick={(e) => changeChosenFile({ left: '-' })} className='top-0 left-0 z-50 absolute flex justify-center items-center bg-gradient-to-r from-gray-500 hover:from-gray-400 px-8 h-screen text-white cursor-pointer'>
							<i className='fa-caret-left text-3xl fa-solid'></i>
						</div>
						<div onClick={(e) => changeChosenFile({ right: '+' })} className='top-0 right-0 z-50 absolute flex justify-center items-center bg-gradient-to-l from-gray-500 hover:from-gray-400 px-8 h-screen text-white cursor-pointer'>
							<i className='fa-caret-right text-3xl fa-solid'></i>
						</div>
					</>
				)}
				{poznavacka == 'rostliny' && <div className='shadow-[0_0_20px_0_rgb(0,0,0,0.5)] mb-8 px-8 py-2 rounded-2xl font-bold text-4xl text-gray-400'>{category}</div>}
				<div className='w-full h-[60%] overflow-hidden'>
					<div id='enlarged-img-slider' className={'relative h-full ' + (lock && 'transition-[left]')} style={{ left: `-${files.indexOf(chosenFile) * 100}%` }}>
						{files.map((file, idx) => {
							return (
								<div key={idx} className='top-0 absolute flex flex-col justify-end items-center w-full h-full' style={{ left: `${files.indexOf(file) * 100}%` }}>
									<img src={('./assets/' + poznavacka + '/' + file).replace(' ', '%20').replace('+', '%2b')} className='h-[85%] object-contain' alt='Obrázek kytky' />
									<span className='mt-5 font-bold text-3xl text-center text-gray-300'>
										{idx + 1}. {prettify(file)}
									</span>
								</div>
							);
						})}
					</div>
				</div>
				<button onClick={(e) => setChosenFile(null)} className={'top-3 left-24 absolute text-gray-400 ' + (window.matchMedia('(pointer:coarse)').matches && '!left-[5%]')}>
					<i className='fa-arrow-left text-2xl fa-solid'></i>
				</button>
			</div>
			{/* Search/controls bar */}
			<div className='top-0 z-20 sticky border-gray-500 bg-[rgb(52,62,80)] shadow-[0_3px_10px_-2px_rgb(0,0,0,0.3)] border-b w-full place-self-center'>
				<form onSubmit={scrollToPlant} className='relative flex justify-end items-center p-3'>
					<input placeholder={'Hledat ' + (browseCategories ? 'oddělení' : 'název/číslo rostliny')} onChange={(e) => setFilter(e.target.value)} value={filter} type='text' className='flex-grow border-gray-500 bg-gray-600 shadow-[0_3px_10px_-2px_rgb(0,0,0,0.3)] px-4 py-2 border rounded-full text-gray-200 caret-gray-400 outline-none' />
					<div className='absolute mr-5 text-gray-500'>
						{filter && <i onClick={(e) => setFilter('')} className='text-lg cursor-pointer fa-solid fa-xmark' />}
						<button className='ml-4 phone-invisible'>
							<i className='text-gray-400 fa-magnifying-glass fa-solid' />
						</button>
					</div>
				</form>
				{poznavacka == 'rostliny' && (
					<div className='flex justify-between items-center p-1 cursor-pointer'>
						<div className='flex items-center w-1/2' onClick={(e) => setShowCategories((prev) => (prev ? false : true))}>
							<div className={'border-gray-500 border rounded w-4 h-4 flex justify-center items-center ' + (showCategories && 'bg-gray-500')}>{showCategories && <i className='text-gray-300 text-xs fa-check fa-solid'></i>}</div>
							<p className='ml-2 text-[rgb(133,144,155)]'>Ukázat oddělení</p>
						</div>
						{showCategories && (
							<div className='flex items-center w-1/2' onClick={(e) => setBrowseCategories((prev) => (prev ? false : true))}>
								<div className={'border-gray-500 border rounded w-4 h-4 flex justify-center items-center ' + (browseCategories && 'bg-gray-500')}>{browseCategories && <i className='text-gray-300 text-xs fa-check fa-solid'></i>}</div>
								<p className='ml-2 text-[rgb(133,144,155)]'>Hledat v odděleních</p>
							</div>
						)}
					</div>
				)}
			</div>
			{/* List */}
			<div id='list' onScroll={handleScroll} className='custom-scrollbar overflow-y-scroll'>
				{files.map((file, idx) => {
					let isSearched =
						filter &&
						!browseCategories &&
						prettify(file)
							.split(' ')
							.some((f) => f.toLowerCase().startsWith(filter.toLowerCase()));

					if (filter == '7p' && ((idx + 1) % 7 !== 0 || idx + 1 > 140)) return;
					return (
						<div id={'plant-' + idx} key={idx}>
							{categories[idx + 1] && showCategories && (
								<div id={'cat-' + categories[idx + 1]} className='py-1 pl-3 font-semibold text-[rgb(117,124,138)]'>
									{categories[idx + 1]}
								</div>
							)}
							<div onClick={(e) => setChosenFile(file)} className='flex items-center border-gray-500 p-2 border-b h-20 cursor-pointer'>
								<img key={poznavacka + idx} src={`./assets/${poznavacka}/${file}`.replace(' ', '%20').replace('+', '%2b')} alt='Obrázek rostliny' className='max-h-full' />
								<span className={'ml-5 font-bold text-gray-400 text-xl transition-all duration-500 plant-list-item ease-out ' + (isSearched && '!text-gray-200')}>
									{idx + 1}. {prettify(file)}
								</span>
							</div>
						</div>
					);
				})}
			</div>

			{/* Scroll Up Button */}
			<button style={{ opacity: scrollY > 100 && '100' }} onClick={(e) => scrollY > 100 && document.getElementById('list').scrollTo({ top: 0, behavior: 'smooth' })} className='right-3 md:right-8 bottom-3 absolute opacity-0 px-1 transition-opacity duration-300 outline-none'>
				<i className='text-[1.6rem] text-gray-300 fa-angles-up fa-solid'></i>
			</button>
		</div>
	);
}
