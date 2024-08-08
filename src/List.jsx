import { useRef, useState } from 'react';

export default function List() {
	const [filter, setFilter] = useState('');

	const files = useRef(__FILES__);

	function capitalize(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return (
		<div className='flex flex-col bg-gray-700 min-h-svh'>
			<div className='top-0 sticky flex items-center w-full'>
				<label className='bg-gray-700 px-3 py-1 text-gray-400' htmlFor='imgFilter'>
					<i className='mr-1 fa-filter fa-solid' />
					Filtr
				</label>
				<input onChange={(e) => setFilter(e.target.value)} value={filter} id='imgFilter' type='text' className='flex-grow bg-gray-600 p-1 text-gray-200 caret-gray-400 outline-none' />
			</div>
			{files.current
				?.sort((a, b) => parseInt(a.replaceAll(/\D/g, '')) - parseInt(b.replaceAll(/\D/g, '')))
				.map((file, idx) => {
					let readableFile = file
						.split('.')[0]
						.replaceAll(/[0-9+_]/g, '')
						.replace('-', ' - ');

					if (!filter || (/\d/.test(filter) && (idx + 1).toString().startsWith(filter)) || (isNaN(filter) && file.includes(filter))) {
						return (
							<div key={idx} className='flex items-center border-gray-500 p-2 border-b h-20'>
								<img src={('./assets/img/' + file).replace(' ', '%20').replace('+', '%2b')} alt='Obrázek rostliny' className='max-h-full' />
								<span className='ml-5 font-bold text-gray-400 text-xl'>
									{idx + 1}. {capitalize(readableFile)}
								</span>
							</div>
						);
					}
				})}
		</div>
	);
}
