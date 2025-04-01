import { useEffect, useRef, useState } from 'react';
import { categories, dir, isObject, nameFromPath } from './utilities.js';

export default function List({ lock, setLock, poznavacka }) {
	const [chosenFile, setChosenFile] = useState();
	const [category, setCategory] = useState();
	const [showCategories, setShowCategories] = useState();
	const [browseCategories, setBrowseCategories] = useState();
	const [filter, setFilter] = useState('');
	const [scrollY, setScrollY] = useState();
	const [searchVisible, setSearchVisible] = useState(false);

	let files = Object.values(poznavacka)[0];

	window.onkeydown = handleKeyDown;

	useEffect(() => {
		if (poznavacka != 'rostliny') setShowCategories(false);
		document.getElementById('list').scrollTop = 0;
		if (!filter) setChosenFile();
		// const observer = new IntersectionObserver((entries) => {
		// 	entries.forEach(
		// 		(entry) => {
		// 			entry.target.classList.toggle('opacity-70', !entry.isIntersecting);
		// 			entry.target.classList.toggle('-translate-x-12', !entry.isIntersecting);
		// 		},
		// 		{
		// 			threshold: 1,
		// 		}
		// 	);
		// });

		// document.querySelectorAll('.plant-list-item')?.forEach((el) => {
		// 	observer.observe(el);
		// });

		// return () => {
		// 	document.querySelectorAll('.plant-list-item')?.forEach((el) => {
		// 		observer.unobserve(el);
		// 	});
		// };
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
				for (const i of nameFromPath(f).toLowerCase().split(' ')) {
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

	function toggleSearch(e) {
		e.preventDefault();
		document.getElementById('list-search').classList.toggle('!w-full');
		document.getElementById('list-search').classList.toggle('border');
		setSearchVisible(!searchVisible);
	}

	return (
		<div className='relative flex flex-col h-full overflow-hidden'>
			{/* Enlarged image carousel */}
			<div id='enlarged-img' className={'translate-y-full left-0 z-40 absolute flex gap-4 transition-transform justify-center items-center bg-neutral-800 w-full h-full ' + (chosenFile && '!translate-y-0')}>
				{/* {Object.keys(poznavacka)[0] == 'rostliny' && <div className='shadow-[0_0_20px_0_rgb(0,0,0,0.5)] mb-8 px-8 py-2 rounded-2xl font-bold text-[--text-main] text-4xl'>{category}</div>} */}

				{!window.matchMedia('(pointer: coarse)').matches && (
					<div onClick={(e) => changeChosenFile({ left: '-' })} className='text-neutral-400 cursor-pointer'>
						<i className='fa-angle-left text-5xl fa-solid'></i>
					</div>
				)}
				<div className='w-[max(60%,400px)] h-[60%] overflow-hidden'>
					<div id='enlarged-img-slider' className={'relative h-full ' + (lock && 'transition-[left]')} style={{ left: `-${files.indexOf(chosenFile) * 100}%` }}>
						{files
							.filter((f) => !isObject(f))
							.map((file, idx) => {
								return (
									<div key={idx} className='top-0 absolute flex flex-col justify-end items-center w-full h-full' style={{ left: `${files.indexOf(file) * 100}%` }}>
										<img src={file.replace(' ', '%20').replace('+', '%2b')} className='rounded-lg h-[85%] object-contain' alt='Obrázek kytky' />
										<span className='mt-5 font-bold text-neutral-400 text-3xl text-center'>
											{idx + 1}. {nameFromPath(file)}
										</span>
									</div>
								);
							})}
					</div>
				</div>
				{!window.matchMedia('(pointer: coarse)').matches && (
					<div onClick={(e) => changeChosenFile({ right: '+' })} className='text-neutral-400 cursor-pointer'>
						<i className='fa-angle-right text-5xl fa-solid'></i>
					</div>
				)}
				<button onClick={(e) => setChosenFile(null)} className={'top-3 left-24 absolute text-[--text-main] ' + (window.matchMedia('(pointer:coarse)').matches && '!left-[5%]')}>
					<i className='fa-arrow-left text-2xl fa-solid'></i>
				</button>
			</div>
			{/* Search/controls bar */}
			<div className='top-4 right-4 z-20 absolute max-w-[calc(100%-2rem)] overflow-hidden'>
				<form tabIndex={0} onKeyDown={(e) => e.key == 'Enter' && scrollToPlant(e)} className='relative flex justify-end items-center gap-2'>
					<div id='list-search' className='relative flex items-center bg-neutral-700 border-neutral-600 rounded-full w-0 min-w-0 h-10 overflow-hidden transition-[width] duration-300'>
						<input placeholder={'Hledat ' + (browseCategories ? 'oddělení' : 'název/číslo')} onChange={(e) => setFilter(e.target.value)} value={filter} type='text' className='flex-grow bg-inherit ml-4 outline-none w-full h-full placeholder:font-normal font-semibold text-neutral-400 placeholder:text-neutral-500 caret-neutral-400' />
						<i onClick={(e) => setFilter('')} className={'text-lg ml-2 mr-4 text-neutral-500 cursor-pointer fa-solid fa-xmark ' + (!filter && 'pointer-events-none opacity-0')} />
					</div>
					<button onClick={toggleSearch} className='bg-neutral-600 rounded-full outline-none min-w-10 aspect-square text-neutral-400'>
						{searchVisible ? <i className='fa-solid fa-xmark' /> : <i className='fa-magnifying-glass fa-solid' />}
					</button>
				</form>
				{/* {poznavacka == 'rostliny' && (
					<div className='flex justify-between items-center p-1 cursor-pointer'>
						<div className='flex items-center w-1/2' onClick={(e) => setShowCategories((prev) => (prev ? false : true))}>
							<div className={'border-[--bg-secondary] border rounded w-4 h-4 flex justify-center items-center ' + (showCategories && 'bg-[--bg-secondary]')}>{showCategories && <i className='text-[--text-bright] text-xs fa-check fa-solid'></i>}</div>
							<p className='ml-2 text-[--bg-secondary]'>Ukázat oddělení</p>
						</div>
						{showCategories && (
							<div className='flex items-center w-1/2' onClick={(e) => setBrowseCategories((prev) => (prev ? false : true))}>
								<div className={'border-[--bg-secondary] border rounded w-4 h-4 flex justify-center items-center ' + (browseCategories && 'bg-[--bg-secondary]')}>{browseCategories && <i className='text-[--text-bright] text-xs fa-check fa-solid'></i>}</div>
								<p className='ml-2 text-[--bg-secondary]'>Hledat v odděleních</p>
							</div>
						)}
					</div>
				)} */}
			</div>
			{/* List */}
			<div id='list' onScroll={handleScroll} className='relative overflow-y-scroll'>
				<div className='gap-2 grid bg-neutral-900 p-2'>
					{files
						.filter((f) => !isObject(f))
						.map((file, idx) => {
							let isSearched =
								filter &&
								!browseCategories &&
								nameFromPath(file)
									.split(' ')
									.some((f) => f.toLowerCase().startsWith(filter.toLowerCase()));
							return (
								<div id={'plant-' + idx} key={idx}>
									{/* {categories[idx + 1] && showCategories && (
									<div id={'cat-' + categories[idx + 1]} className='py-1 pl-3 font-semibold text-[--bg-secondary]'>
										{categories[idx + 1]}
									</div>
								)} */}
									<div onClick={(e) => setChosenFile(file)} className='relative items-center grid grid-cols-[5rem,1fr] bg-neutral-800 rounded-xl h-20 overflow-hidden cursor-pointer'>
										<img key={poznavacka + idx} src={file.replace(' ', '%20').replace('+', '%2b')} alt='Obrázek rostliny' className='h-full object-cover' />
										<div className='relative flex items-center self-start h-20'>
											<span className={'ml-5 text-neutral-400 z-20 text-xl ' + (isSearched && '!text-neutral-300 font-semibold')}>{nameFromPath(file)}</span>
											<div className='top-0 right-2 z-10 absolute font-black text-neutral-600 text-xl'>{idx + 1}</div>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>

			{/* Scroll Up Button */}
			<button style={{ opacity: scrollY > 100 && '100' }} onClick={(e) => scrollY > 100 && document.getElementById('list').scrollTo({ top: 0, behavior: 'smooth' })} className='right-2 md:right-8 bottom-2 z-50 absolute bg-neutral-900 opacity-0 border border-neutral-700 rounded-full outline-none h-12 aspect-square transition-opacity duration-300'>
				<i className='text-neutral-500 text-2xl fa-angles-up fa-solid'></i>
			</button>
		</div>
	);
}
