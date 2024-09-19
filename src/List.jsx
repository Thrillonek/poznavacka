import { useEffect, useRef, useState } from 'react';

export default function List({ setLock }) {
	const [filter, setFilter] = useState('');
	const [chosenFile, setChosenFile] = useState();

	const files = useRef(__FILES__);
	const filteredFiles = filter ? files.current.filter((f) => (/\d/.test(filter) && (files.current.indexOf(f) + 1).toString().startsWith(filter)) || (isNaN(filter) && prettify(f).toLowerCase().includes(filter.toLowerCase()))) : files.current;

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(
				(entry) => {
					entry.target.classList.toggle('!opacity-100', entry.isIntersecting);
					entry.target.classList.toggle('!translate-x-0', entry.isIntersecting);
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
	}, [filter]);

	useEffect(() => {
		let startX, startY, changeX, changeY, startMS;

		let enlarged = document.getElementById('enlarged-img');

		let locked;

		if (chosenFile) {
			enlarged.style.top = `0px`;
			setLock(true);
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
			changeChosenFile({ left: changeX < 0, right: changeX > 0 });
		};

		document.addEventListener('touchstart', handleTouchStart, { passive: false });
		document.addEventListener('touchmove', handleTouchMove, { passive: false });
		document.addEventListener('touchend', handleTouchEnd);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [chosenFile, filter]);

	function changeChosenFile(conditions) {
		let idx = chosenFile && filteredFiles.indexOf(chosenFile);

		if (conditions.left) {
			idx == filteredFiles.length - 1 ? (idx = 0) : idx++;
		} else if (conditions.right) {
			idx == 0 ? (idx = filteredFiles.length - 1) : idx--;
		}

		setChosenFile(filteredFiles[idx]);
		if (filter) return;
		let el = document.getElementById('plant-' + idx);
		el.scrollIntoView({ block: 'center' });
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
			<div id='enlarged-img' className={'top-0 translate-y-full left-0 z-40 absolute flex flex-col transition-transform justify-center items-center bg-gray-700 p-3 w-screen h-full ' + (chosenFile && '!translate-y-0')}>
				{!window.matchMedia('(pointer: coarse)').matches && (
					<>
						<div onClick={(e) => changeChosenFile({ right: '-' })} className='top-0 left-0 z-50 absolute flex justify-center items-center bg-gradient-to-r from-gray-500 hover:from-gray-400 px-8 h-screen text-white cursor-pointer'>
							<i className='fa-caret-left text-3xl fa-solid'></i>
						</div>
						<div onClick={(e) => changeChosenFile({ left: '+' })} className='top-0 right-0 z-50 absolute flex justify-center items-center bg-gradient-to-l from-gray-500 hover:from-gray-400 px-8 h-screen text-white cursor-pointer'>
							<i className='fa-caret-right text-3xl fa-solid'></i>
						</div>
					</>
				)}
				<div className='w-full h-[60%] overflow-hidden'>
					<div id='enlarged-img-slider' className={'relative h-full ' + (chosenFile && 'transition-[left]')} style={{ left: `-${filteredFiles.indexOf(chosenFile) * 100}%` }}>
						{files.current.map((file, idx) => {
							if (!filter || (/\d/.test(filter) && (idx + 1).toString().startsWith(filter)) || (isNaN(filter) && prettify(file).toLowerCase().includes(filter.toLowerCase()))) {
								return (
									<div className='top-0 absolute flex flex-col justify-between items-center w-full h-full' style={{ left: `${filteredFiles.indexOf(file) * 100}%` }}>
										<img src={('./assets/img/' + file).replace(' ', '%20').replace('+', '%2b')} className='max-h-[85%] object-contain' alt='Obrázek kytky' />
										<span className='font-bold text-3xl text-center text-gray-300'>
											{idx + 1}. {prettify(file)}
										</span>
									</div>
								);
							}
						})}
					</div>
				</div>
				<button onClick={(e) => setChosenFile(null)} className={'top-3 left-24 absolute text-gray-400 ' + (window.matchMedia('(pointer:coarse)').matches && '!left-[5%]')}>
					<i className='fa-arrow-left text-2xl fa-solid'></i>
				</button>
			</div>
			<div className='top-0 z-20 sticky border-gray-500 bg-[rgb(52,62,80)] shadow-[0_3px_10px_-2px_rgb(0,0,0,0.3)] border-b w-full place-self-center'>
				<div className='relative flex justify-end items-center p-3'>
					<input onChange={(e) => setFilter(e.target.value)} placeholder='Hledat název/číslo rostliny' value={filter} id='imgFilter' type='text' className='flex-grow border-gray-500 bg-gray-600 shadow-[0_3px_10px_-2px_rgb(0,0,0,0.3)] px-4 py-2 border rounded-full text-gray-200 caret-gray-400 outline-none' />
					{filter && <i onClick={(e) => setFilter('')} className='absolute mr-5 text-gray-500 text-lg cursor-pointer fa-solid fa-xmark' />}
				</div>
			</div>
			<div className='overflow-y-scroll'>
				{files.current.map((file, idx) => {
					if (!filter || (/\d/.test(filter) && (idx + 1).toString().startsWith(filter)) || (isNaN(filter) && prettify(file).toLowerCase().includes(filter.toLowerCase()))) {
						return (
							<div key={idx} id={'plant-' + idx} onClick={(e) => setChosenFile(file)} className='flex items-center border-gray-500 p-2 border-b h-20 cursor-pointer'>
								<img src={('./assets/img/' + file).replace(' ', '%20').replace('+', '%2b')} alt='Obrázek rostliny' className='max-h-full' />
								<span className='opacity-0 ml-5 font-bold text-gray-400 text-xl transition-all -translate-x-32 duration-[400ms] plant-list-item'>
									{idx + 1}. {prettify(file)}
								</span>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
}
