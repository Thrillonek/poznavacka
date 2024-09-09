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
	}, []);

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className='relative flex flex-col bg-gray-700 h-dvh overflow-hidden'>
			{chosenFile && (
				<div className='top-0 left-0 absolute flex flex-col justify-around items-center bg-gray-700 p-3 w-screen h-full'>
					<div className='h-1/2'>
						<img src={('./assets/img/' + chosenFile).replace(' ', '%20').replace('+', '%2b')} className='max-h-full' alt='Obrázek kytky' />
					</div>
					<span className='font-bold text-3xl text-center text-gray-300'>
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
				{!chosenFile && (
     <>
					<div className='flex items-center w-full'>
						<label className='bg-gray-700 px-3 py-1 text-gray-400' htmlFor='imgFilter'>
							<i className='mr-1 fa-filter fa-solid' />
							Filtr
						</label>
						<input onChange={(e) => setFilter(e.target.value)} value={filter} id='imgFilter' type='text' className='flex-grow bg-gray-600 p-1 text-gray-200 caret-gray-400 outline-none' />
					</div>
				
				<div className='overflow-y-scroll'>
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
</>
    )}
		</div>
	);
}
