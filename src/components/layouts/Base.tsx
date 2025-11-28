import 'src/assets/_base.scss';
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
		<div className='relative flex max-md:flex-col bg-dark h-full overflow-x-hidden'>
			<div className='relative fill-space'>
				<div className={'flex absolute w-full h-full z-20 ' + (mode == 'settings' ? '' : 'hidden')}>
					<Settings />
				</div>
				{poznavacka && objFirstValue(poznavacka!).filter((f: any) => !isObject(f)).length > 0 ? (
					<div className={'mode-slider fill-space ' + (mode == 'quiz' ? 'quiz-mode' : '')}>
						<div className={'left-0'}>
							<Quiz />
						</div>
						<div className={'left-full md:left-0 ' + (mode == 'list' ? '' : 'md:hidden')}>
							<List />
						</div>
					</div>
				) : (
					<div className='flex-col gap-y-2 fill-space px-8 text-center center-content'>
						<h1 className='font-bold text-main text-4xl'>Poznávačka Tool</h1>
						<p className='text-muted text-xl'>Pro pokračování zvolte poznávačku (skupinu&nbsp;obrázků) ve výběru nalevo</p>
					</div>
				)}
			</div>

			{/* MODE MENU  */}
			<div className='md:hidden p-2'>
				<ModeMenu />
			</div>
		</div>
	);
}
