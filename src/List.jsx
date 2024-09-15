import { useEffect, useRef, useState } from 'react';

export default function List() {
	const [filter, setFilter] = useState('');
	const [chosenFile, setChosenFile] = useState();

	const files = useRef(__FILES__);

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
		let startX, startY, changeX, changeY;

		let idx = chosenFile && files.current.indexOf(chosenFile);

		let handleTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		};
		let handleTouchMove = (e) => {
			if (!startX) return;

			let deltaX = e.touches[0].clientX;
			let deltaY = e.touches[0].clientY;

			changeX = deltaX - startX;
			changeY = deltaY - startY;
		};

		let handleTouchEnd = (e) => {
			if (!chosenFile) return;

			if (changeX > 0) {
				idx == 0 ? (idx = files.current.length - 1) : idx--;
			} else if (changeX < 0) {
				idx == files.current.length - 1 ? (idx = 0) : idx++;
			}
			setChosenFile(files.current[idx]);
		};

		document.addEventListener('touchstart', handleTouchStart);
		document.addEventListener('touchmove', handleTouchMove);
		document.addEventListener('touchend', handleTouchEnd);

		return () => {
			document.removeEventListener('touchstart', handleTouchStart);
			document.removeEventListener('touchmove', handleTouchMove);
			document.removeEventListener('touchend', handleTouchEnd);
		};
	}, [chosenFile]);

	function switchEnlargedImg(operation) {
		let idx = chosenFile && files.current.indexOf(chosenFile);

		if (operation == '+') {
			idx == files.current.length - 1 ? (idx = 0) : idx++;
		}
		if (operation == '-') {
			idx == 0 ? (idx = files.current.length - 1) : idx--;
		}
		setChosenFile(files.current[idx]);
	}

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className='relative flex flex-col bg-gray-700 h-dvh overflow-hidden'>
			{chosenFile && (
				<div className='top-0 left-0 z-40 absolute flex flex-col justify-around items-center bg-gray-700 p-3 w-screen h-full'>
					{!window.matchMedia('(pointer: coarse)').matches && (
						<>
							<div onClick={(e) => switchEnlargedImg('-')} className='top-0 left-0 z-50 absolute flex justify-center items-center bg-gradient-to-r from-gray-500 hover:from-gray-400 px-8 h-screen text-white cursor-pointer'>
								<i className='fa-caret-left text-3xl fa-solid'></i>
							</div>
							<div onClick={(e) => switchEnlargedImg('+')} className='top-0 right-0 z-50 absolute flex justify-center items-center bg-gradient-to-l from-gray-500 hover:from-gray-400 px-8 h-screen text-white cursor-pointer'>
								<i className='fa-caret-right text-3xl fa-solid'></i>
							</div>
						</>
					)}
					<div className='h-1/2'>
						<img src={('./assets/img/' + chosenFile).replace(' ', '%20').replace('+', '%2b')} className='max-h-full' alt='Obrázek kytky' />
					</div>
					<span className='font-bold text-3xl text-center text-gray-300'>
						{files.current.indexOf(chosenFile) + 1}.{' '}
						{capitalize(
							chosenFile
								.split('.')[0]
								.replaceAll(/[0-9+_]/g, '')
								.replace('-', ' - ')
						)}
					</span>
					<button onClick={(e) => setChosenFile(null)} className='text-gray-400 text-lg underline'>
						Zpět
					</button>
				</div>
			)}
			<div className='z-20 absolute flex items-center mt-2 w-[95%] place-self-center'>
				<input onChange={(e) => setFilter(e.target.value)} placeholder='Hledat název/číslo rostliny' value={filter} id='imgFilter' type='text' className='flex-grow bg-gray-600 shadow-[0_0_10px_1px_rgb(0,0,0,0.3)] px-4 py-2 rounded-full text-gray-200 caret-gray-400 outline-none' />
			</div>
			<div className='overflow-y-scroll'>
				<div className='mt-12'>
					{files.current
						?.sort((a, b) => parseInt(a.replaceAll(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')))
						.map((file, idx) => {
							let readableFile = file
								.split('.')[0]
								.replaceAll(/[0-9+_]/g, '')
								.replace('-', ' - ');

							if (!filter || (/\d/.test(filter) && (idx + 1).toString().startsWith(filter)) || (isNaN(filter) && file.includes(filter.toLowerCase()))) {
								return (
									<div key={idx} onClick={(e) => setChosenFile(file)} className='flex items-center border-gray-500 p-2 border-b h-20'>
										<img src={('./assets/img/' + file).replace(' ', '%20').replace('+', '%2b')} alt='Obrázek rostliny' className='max-h-full' />
										<span className='opacity-0 ml-5 font-bold text-gray-400 text-xl transition-all -translate-x-32 duration-[400ms] plant-list-item'>
											{idx + 1}. {capitalize(readableFile)}
										</span>
									</div>
								);
							}
						})}
				</div>
			</div>
		</div>
	);
}
