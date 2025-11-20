import { useModeStore, usePoznavackaStore, useSwipeLockStore } from 'src/data';
import { useAddEventListener, useInitiateSwipeEvent } from 'src/hooks';
import { isObject, objFirstValue } from 'src/utils';
import List from '../../features/list/components/List';
import Quiz from '../../features/quiz/components/Quiz';
import Settings from '../../features/settings/components/Settings';
import ModeMenu from '../ui/ModeMenu';

export default function Base() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { mode, setMode } = useModeStore((store) => store);
	const isLocked = useSwipeLockStore((state) => state.isLocked);

	useInitiateSwipeEvent();

	useAddEventListener(
		'custom:swipe',
		(e: CustomEventInit) => {
			const direction = e.detail.direction;
			if (isLocked) return;

			if (direction == 'right' && mode == 'list') setMode('quiz');
			if (direction == 'left' && mode == 'quiz') setMode('list');
		},
		[mode, isLocked]
	);

	return (
		<div className='relative flex max-md:flex-col bg-neutral-800 h-full overflow-x-hidden'>
			<div className='relative flex flex-grow'>
				<div className={'flex absolute w-full h-full z-20 ' + (mode == 'settings' ? '' : 'hidden')}>
					<Settings />
				</div>
				{poznavacka && objFirstValue(poznavacka!).filter((f: any) => !isObject(f)).length > 0 ? (
					<div className={'relative z-10 flex-grow transition-none bg-inherit max-md:transition-[left] duration-500 ' + (mode == 'quiz' ? 'left-0' : 'max-md:-left-full')}>
						<div className={'top-0 left-0 absolute w-full h-full'}>
							<Quiz />
						</div>
						<div className={'top-0 bg-inherit left-full md:left-0 absolute w-full h-full ' + (mode == 'list' ? '' : 'md:hidden')}>
							<List />
						</div>
					</div>
				) : (
					<div className='fill-space center-content'>
						<h1 className='font-bold text-muted text-5xl text-center'>Zvolte poznávačku</h1>
					</div>
				)}
			</div>

			{/* MODE MENU  */}
			<div className='md:hidden'>
				<ModeMenu />
			</div>
		</div>
	);
}
