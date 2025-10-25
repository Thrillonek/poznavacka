import { useEffect } from 'react';
import { insectGroupNames, usePoznavackaStore, useSwipeLockStore } from 'src/data';
import { useAddEventListener } from 'src/hooks';
import { getFiles, getGroupName, isObject, nameFromPath, objFirstKey } from 'src/utils';
import { useChosenFileStore } from '../data/stores';
import { changeChosenFile } from '../utils/changeChosenFile';

function EnlargedImage() {
	const chosenFile = useChosenFileStore((store) => store.chosenFile);
	const setChosenFile = useChosenFileStore((store) => store.setChosenFile);
	const isChosenFileSet = useChosenFileStore((store) => store.isSet);

	const unlockSwiping = useSwipeLockStore((store) => store.unlockSwiping);
	const lockSwiping = useSwipeLockStore((store) => store.lockSwiping);

	const poznavacka = usePoznavackaStore((store) => store.poznavacka);

	const files = getFiles();

	useAddEventListener('keydown', handleKeyDown);
	function handleKeyDown(e: KeyboardEvent) {
		if (e.key == 'ArrowRight') {
			changeChosenFile({ right: true });
		} else if (e.key == 'ArrowLeft') {
			changeChosenFile({ left: true });
		}
	}

	useAddEventListener('custom:swipe', handleSwipe);
	function handleSwipe(e: CustomEvent) {
		let direction = e.detail.direction;
		if (direction == 'left') changeChosenFile({ right: true });
		if (direction == 'right') changeChosenFile({ left: true });
		if (direction == 'down') setChosenFile(null);
	}

	// LOCKS MODE CHANGES WHEN IMAGE IS ENLARGED
	useEffect(() => {
		if (isChosenFileSet) {
			lockSwiping();
		} else {
			unlockSwiping();
		}
	}, [isChosenFileSet]);

	let isPhone = window.matchMedia('(pointer: coarse)').matches;

	return (
		<div id='enlarged-img' className={'translate-y-full left-0 z-40 absolute flex gap-4 transition-transform justify-center items-center bg-neutral-800 w-full h-full ' + (chosenFile && '!translate-y-0')}>
			{!isPhone && (
				<div onClick={() => changeChosenFile({ left: true })} className='text-neutral-400 cursor-pointer'>
					<i className='fa-angle-left text-5xl fa-solid'></i>
				</div>
			)}
			<div className='flex flex-col w-[70%] max-sm:w-[90%] h-[60%] overflow-hidden'>
				<span className='mx-auto mb-8 font-bold text-neutral-300 text-3xl'>{files.indexOf(chosenFile) + 1}</span>
				<div id='enlarged-img-slider' className={'relative transition-[left] grid grid-flow-col flex-grow ' /*(chosenFile ? '' : '')*/} style={{ left: `-${files.indexOf(chosenFile) * 100}%` }}>
					{files
						.filter((f) => !isObject(f))
						.map((file, idx) => {
							return (
								<div key={idx} className='top-0 absolute flex justify-center w-full h-full' style={{ left: `${files.indexOf(file) * 100}%` }}>
									<div className='rounded-lg overflow-hidden'>
										<img src={file.replace(' ', '%20').replace('+', '%2b')} className='w-full h-full object-contain overflow-hidden' alt='Obrázek' />
									</div>
								</div>
							);
						})}
				</div>
				<span className='mt-5 font-bold text-neutral-400 text-3xl text-center'>
					{chosenFile && nameFromPath(chosenFile)}
					{objFirstKey(poznavacka!) == 'hmyz' && (
						<>
							<br />
							<p className='font-normal text-lg'>Řád: {getGroupName(files.indexOf(chosenFile), insectGroupNames)}</p>
						</>
					)}
				</span>
			</div>
			{!isPhone && (
				<div onClick={() => changeChosenFile({ right: '+' })} className='text-neutral-400 cursor-pointer'>
					<i className='fa-angle-right text-5xl fa-solid'></i>
				</div>
			)}
			<button onClick={() => setChosenFile(null)} className={'top-3 left-24 absolute text-neutral-400 ' + (isPhone && '!left-[5%]')}>
				<i className='fa-arrow-left text-2xl fa-solid'></i>
			</button>
		</div>
	);
}

export default EnlargedImage;
