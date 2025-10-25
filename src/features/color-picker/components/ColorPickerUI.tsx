import { loadColors } from '../services/loadColors';

export default function ColorPickerUI() {
	const root: HTMLElement = document.querySelector(':root')!;

	return (
		<div className='top-6 right-6 z-20 fixed flex flex-col bg-[--bg-main] p-5 border border-[--bg-secondary] rounded-xl w-[min(80%,300px)] scale-[--color-scale] origin-top-right transition-transform'>
			<i onClick={() => root.style.setProperty('--color-scale', '0')} className='top-3 right-4 absolute text-[--text-main] text-lg cursor-pointer fa-solid fa-xmark' />
			<h2 className='mb-2 font-bold text-[--text-bright] text-xl'>Změnit barvy</h2>
			<p className='mt-2 mb-1 font-semibold text-[--text-bright] text-lg'>Text</p>
			<input defaultValue={getComputedStyle(root).getPropertyValue('--text-main')} id='--text-main' className='bg-[--bg-bright] my-1 rounded outline-none w-full color-picker' type='color' />
			<p className='mt-2 mb-1 font-semibold text-[--text-bright] text-lg'>Výrazný text</p>
			<input defaultValue={getComputedStyle(root).getPropertyValue('--text-bright')} id='--text-bright' className='bg-[--bg-bright] my-1 rounded outline-none w-full text-[--text-bright] caret-[--bg-secondary] color-picker' type='color' />
			<p className='mt-2 mb-1 font-semibold text-[--text-bright] text-lg'>Pozadí</p>
			<input defaultValue={getComputedStyle(root).getPropertyValue('--bg-main')} id='--bg-main' className='bg-[--bg-bright] my-1 rounded outline-none w-full text-[--text-bright] caret-[--bg-secondary] color-picker' type='color' />
			<p className='mt-2 mb-1 font-semibold text-[--text-bright] text-lg'>Vedlejší</p>
			<input defaultValue={getComputedStyle(root).getPropertyValue('--bg-secondary')} id='--bg-secondary' className='bg-[--bg-bright] my-1 rounded outline-none w-full text-[--text-bright] caret-[--bg-secondary] color-picker' type='color' />
			<p className='mt-2 mb-1 font-semibold text-[--text-bright] text-lg'>Výrazné pozadí</p>
			<input defaultValue={getComputedStyle(root).getPropertyValue('--bg-bright')} id='--bg-bright' className='bg-[--bg-bright] my-1 rounded outline-none w-full text-[--text-bright] caret-[--bg-secondary] color-picker' type='color' />
			<button onClick={() => loadColors(null)} className='bg-blue-500 mt-6 p-1 rounded font-bold text-white'>
				Potvrdit
			</button>
			<h2 className='mt-2 font-semibold text-[--text-bright] text-lg'>Předvolby:</h2>
			<button onClick={() => loadColors('default')} className='mt-2 p-1 border border-gray-400 rounded font-semibold text-gray-400'>
				Výchozí
			</button>
			<button onClick={() => loadColors('pink')} className='bg-pink-400 mt-2 p-1 border border-pink-500 rounded font-semibold text-red-700'>
				Růžová
			</button>
		</div>
	);
}
