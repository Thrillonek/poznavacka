import { Icon } from '@iconify/react';
import { Checkbox } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useEffect, useRef, useState } from 'react';
import { isObject } from './utilities.js';

export default function Settings({ poznavacka, updateSettings }) {
	const [settings, setSettings] = useState({ keybinds: { change: 'ArrowUp', reveal: 'ArrowDown' }, quiz: { mode: 'custom', random: true, min: 1, max: 10, presets: [] } });
	const [activeRange, setActiveRange] = useState();
	const [visiblePresets, setVisiblePresets] = useState(false);
	const [changingKeybind, setChangingKeybind] = useState();

	let presetLength = useRef();

	let files = poznavacka && Object.values(poznavacka)[0].filter((f) => !isObject(f));
	const { mode, random, min, max, presets } = settings.quiz;

	useEffect(() => {
		if (poznavacka) {
			presetLength.current = [];
			for (let i = 1; i <= Math.floor(files.length / 10); i++) {
				presetLength.current.push(i);
			}
			changeSettings('min', 1);
			changeSettings('max', files.length);
		}
	}, [poznavacka]);

	useEffect(() => {
		updateSettings(settings);
	}, [settings]);

	const handleChangeMinMax = (e, number) =>
		!isNaN(e.target.value) &&
		e.target.value.length <= 3 &&
		setSettings((prev) => {
			return { ...prev, quiz: { ...prev.quiz, [number]: e.target.value } };
		});

	function togglePreset(num) {
		if (presets.length > 0 && visiblePresets) {
			if (mode != 'preset') changeSettings('mode', 'preset');
		} else changeSettings('mode', 'custom');
		let presetsBuffer = [...presets];
		let presetArray = [];
		for (let i = num * 10 - 10; i <= num * 10 - 1; i++) {
			presetArray.push(i);
		}
		let presetIdx = presets.findIndex((el) => el[9] == num * 10 - 1);
		if (presetIdx == -1) {
			presetsBuffer.push(presetArray);
			changeSettings('presets', presetsBuffer);
		} else {
			presetsBuffer.splice(presetIdx, 1);
			changeSettings('presets', presetsBuffer);
		}
		presetsBuffer.sort((a, b) => a[0] - b[0]);
		changeSettings('presets', presetsBuffer);
	}

	function checkAllPresets() {
		if (settings.quiz.presets.length !== Math.round(files.length / 10)) {
			let newPresets = [];
			for (let i = 0; i < Math.round(files.length / 10); i++) {
				let newPreset = [];
				for (let j = 1; j <= 10; j++) {
					newPreset.push(j + i * 10 - 1);
				}
				newPresets.push(newPreset);
			}
			setSettings((prev) => {
				return { ...prev, quiz: { ...prev.quiz, presets: newPresets } };
			});
		} else changeSettings('presets', []);
	}

	function changeSettings(property, value) {
		setSettings((prev) => {
			return { ...prev, quiz: { ...prev.quiz, [property]: value } };
		});
	}

	const rangeRect = document.getElementById('size-range')?.getBoundingClientRect();
	function handleMove(e) {
		if (!activeRange) return;
		const pos = { x: e.clientX || e.touches[0].clientX, y: e.clientY || e.touches[0].clientY };

		let calculation = Math.round(((pos.x - rangeRect.left) * (files.length - 1)) / rangeRect.width) + 1;
		if (calculation > files.length) calculation = files.length;
		if (calculation < 1) calculation = 1;
		if (calculation == max || calculation == min) return;
		changeSettings(activeRange, calculation);
	}

	function handleKeyDown(e) {
		if (!changingKeybind) return;

		if (e.key == 'Escape') {
			return setChangingKeybind();
		}

		setSettings((prev) => {
			return { ...prev, keybinds: { ...prev.keybinds, [changingKeybind]: e.key } };
		});
		return setChangingKeybind();
	}

	document.onmouseup = () => setActiveRange();
	document.ontouchend = () => setActiveRange();

	return (
		<div tabIndex={0} onTouchMove={handleMove} onKeyDown={handleKeyDown} onMouseMove={handleMove} className='bg-neutral-800 p-8 outline-none w-full h-full overflow-y-auto select-none'>
			<h1 className='mb-8 font-bold text-3xl'>Nastavení</h1>

			<div className='grid lg:grid-cols-2'>
				<div className='flex flex-col gap-4'>
					<h2 className='text-2xl'>Kvíz</h2>
					{/* <button className='top-2 right-3 absolute px-3 py-2' onClick={(e) => document.querySelector(':root').style.setProperty('--settings-scale', 0)}>
					<i className='text-[--text-main] text-2xl fa-solid fa-xmark'></i>
					</button> */}
					<div className='flex flex-col w-full'>
						<h2 className='mt-4 mb-1 text-neutral-300 text-lg'>Způsob generace obrázků</h2>
						<div className='relative gap-px grid grid-cols-2 bg-blue-500 rounded-xl [&>button]:w-full'>
							{/* <div className={'top-0 left-0 z-0 absolute bg-blue-500 m-1 rounded w-[calc(50%-.5rem)] h-[calc(100%-.5rem)] transition-transform ' + (!random && 'translate-x-[calc(100%+.5rem)]')} /> */}
							<button onClick={(e) => changeSettings('random', true)} className={'z-10 text-neutral-400 py-2 outline-none border border-neutral-500 bg-neutral-700 border-r-0 rounded-l-lg ' + (random && '!text-blue-300 !border-blue-500 faint-bg')}>
								Náhodně
							</button>
							<button onClick={(e) => changeSettings('random', false)} className={'z-10 text-neutral-400 py-2 outline-none border border-neutral-500 bg-neutral-700 border-l-0 rounded-r-lg ' + (!random && '!text-blue-300 !border-blue-500 faint-bg')}>
								Postupně
							</button>
						</div>
						{/* <h2 className='mt-4 mb-1 text-neutral-300 text-lg'>Nastavení</h2>
						<div className='relative gap-px grid grid-cols-2 bg-blue-500 rounded-xl [&>button]:w-full'>
							<button onClick={(e) => changeSettings('mode', 'custom')} className={'z-10 text-neutral-400 py-2 border border-neutral-500 bg-neutral-700 border-r-0 rounded-l-lg ' + (mode == 'custom' && '!text-blue-300 !border-blue-500 bg-[hsl(220,33%,25%)] ')}>
								Vlastní
							</button>
							<button onClick={(e) => changeSettings('mode', 'preset')} className={'z-10 text-neutral-400 py-2 border border-neutral-500 bg-neutral-700 border-l-0 rounded-r-lg ' + (mode == 'preset' && '!text-blue-300 !border-blue-500 bg-[hsl(220,33%,25%)] ')}>
								Předvolby
							</button>
						</div> */}
					</div>
					{poznavacka && (
						<div className='flex flex-col'>
							<h2 className='mb-1 text-neutral-300 text-lg'>Zkoušená sada</h2>
							<div className='flex gap-4 mx-auto'>
								<div className='gap-1 grid grid-cols-1 w-12'>
									<label className='font-bold text-neutral-300 text-sm text-center' htmlFor='min'>
										Od
									</label>
									<input id='min' className='bg-neutral-600 p-1 rounded outline-none font-medium text-neutral-300 text-center caret-neutral-400' type='text' onChange={(e) => handleChangeMinMax(e, 'min')} value={settings.quiz.min} />
								</div>
								<div className='gap-1 grid grid-cols-1 w-12'>
									<label className='font-bold text-neutral-300 text-sm text-center' htmlFor='max'>
										Do
									</label>
									<input className='bg-neutral-600 p-1 rounded outline-none font-medium text-neutral-300 text-center caret-neutral-400' type='text' onChange={(e) => handleChangeMinMax(e, 'max')} value={settings.quiz.max} />
								</div>
							</div>
							<div id='size-range' className='relative flex items-center mt-8 h-2'>
								<div id='size-min' onMouseDown={() => setActiveRange('min')} style={{ left: ((min - 1) / files.length) * 99 + '%' }} className={'z-10 absolute bg-blue-500 hover:z-20 transition-colors hover:bg-blue-400 rounded-full h-[200%] aspect-square ' + (activeRange == 'min' ? '!bg-blue-400' : '')}></div>
								<div id='size-max' onMouseDown={() => setActiveRange('max')} style={{ left: ((max - 1) / files.length) * 99 + '%' }} className={'z-10 absolute bg-blue-500 hover:z-20 transition-colors hover:bg-blue-400 rounded-full h-[200%] aspect-square ' + (activeRange == 'max' ? '!bg-blue-400' : '')}></div>
								<div className='relative flex items-center bg-neutral-500 rounded-full w-full h-2/3'>
									<div style={{ left: ((min - 1) / files.length) * 99 + '%', width: ((max - min) / files.length) * 99 + '%' }} className='absolute bg-blue-500 h-full translate-x-2'></div>
								</div>
							</div>
							<div className='flex flex-col bg-neutral-700 mt-8 rounded-xl w-full overflow-hidden'>
								<button className={'flex justify-center outline-none items-center gap-1 col-span-3 py-2 ' + (visiblePresets && 'bg-neutral-800 bg-opacity-[33%]')} onClick={() => setVisiblePresets(!visiblePresets)}>
									<span>Předvolby</span>
									<Icon icon='mi:chevron-up' className={'text-xl transition-all ' + (!visiblePresets && 'rotate-180')}></Icon>
								</button>
								<div className={'grid transition-all  ' + (visiblePresets ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0')}>
									<div className='grid grid-cols-3 auto-rows-fr min-h-0 overflow-hidden text-neutral-300'>
										{presetLength.current?.map((num) => {
											let isChecked = presets?.some((p) => p[9] == num * 10 - 1);
											return (
												<button key={num} onClick={(e) => togglePreset(num)} className={'flex outline-none items-center bg-white bg-opacity-0 hover:bg-opacity-5 transition-colors w-full py-[0.6rem] ' + (isChecked && '!bg-opacity-10')}>
													<p className={'font-bold w-full text-center'}>
														{num != 1 && num - 1}1 - {num}0
													</p>
												</button>
											);
										})}

										<div className='flex flex-col items-center col-span-3'>
											{/* <div className='bg-neutral-600 mx-auto w-[90%] h-px'></div> */}
											<button onClick={checkAllPresets} className='flex-grow bg-neutral-600 bg-opacity-50 hover:bg-opacity-100 w-full font-medium transition-colors'>
												Zaškrtnout všechno
											</button>
										</div>
									</div>
								</div>
							</div>
							{mode == 'preset' && (
								<p className='flex items-center gap-1 mx-auto mt-4 font-semibold text-neutral-300'>
									<Icon icon='solar:danger-line-duotone' className='text-red-400 text-xl'></Icon>Kvíz se orientuje podle rozsahu předvoleb
								</p>
							)}
						</div>
					)}

					<div className='phone-invisible flex flex-col'>
						<h2 className='mb-1 text-neutral-300 text-lg'>Klávesové zkratky</h2>
						<div className='gap-y-px grid bg-neutral-500 [&>*]:p-2 text-neutral-400'>
							{[
								['Změnit obrázek', 'change'],
								['Odhalit jméno', 'reveal'],
							].map((item, index) => {
								return (
									<div className='flex justify-between items-center gap-2 bg-neutral-800'>
										<p className='font-bold'>{item[0]}</p>
										<button className={'keybind-btn ' + (changingKeybind == item[1] ? 'active' : '')} onClick={() => changingKeybind != item[1] && setChangingKeybind(item[1])}>
											{changingKeybind == item[1] ? (
												<div className='flex items-center gap-1'>
													<p>Změnit...</p>
													<Icon onClick={() => setChangingKeybind()} icon='material-symbols:close' className='text-neutral-300 text-xl cursor-pointer'></Icon>
												</div>
											) : settings.keybinds[item[1]].length == 1 ? (
												settings.keybinds[item[1]].toUpperCase()
											) : (
												settings.keybinds[item[1]]
											)}
										</button>
									</div>
								);
							})}
						</div>
						<button
							onClick={() =>
								setSettings((prev) => {
									return { ...prev, keybinds: { change: 'ArrowUp', reveal: 'ArrowDown' } };
								})
							}
							className='hover:bg-neutral-700 hover:bg-opacity-50 mt-2 mr-auto px-4 py-2 border-2 border-neutral-600 rounded text-neutral-300'
						>
							Obnovit výchozí klávesové zkratky
						</button>
					</div>

					<div className='flex items-center mt-4 pt-4 border-neutral-600 border-t'>
						<Checkbox
							sx={{
								color: blue[800],
								'&.Mui-checked': {
									color: blue[600],
								},
							}}
							onChange={(e) =>
								setSettings((prev) => {
									return { ...prev, devMode: e.target.checked };
								})
							}
						></Checkbox>
						<p className='font-semibold text-neutral-300'>Vývojařský režim (zobrazovat index obrázku)</p>
					</div>
					{/* <span className='phone-invisible mb-5 p-2 text-neutral-200 text-lg text-center'>
						<h2 className='font-semibold text-lg'>TIP:</h2>
						Stiskni klávesu <i className='px-1 text-xl fa-caret-square-up fa-solid' /> pro změnu rostliny
						<br />
						a klávesu <i className='px-1 text-xl fa-caret-square-down fa-solid' /> pro název rostliny
					</span> */}
				</div>
			</div>
		</div>
	);
}
