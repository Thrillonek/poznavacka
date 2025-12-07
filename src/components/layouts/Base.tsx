import { useEffect } from 'react';
import 'src/assets/_Base.scss';
import { useModeStore, usePoznavackaStore, useSettingsStore, useSwipeLockStore } from 'src/data';
import { useSettingsModeStore } from 'src/features/settings/data/stores';
import { useAddEventListener, useInitiateSwipeEvent } from 'src/hooks';
import { getContent, isObject } from 'src/utils';
import List from '../../features/list/components/List';
import Quiz from '../../features/quiz/components/Quiz';

export default function Base() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const { mode, setMode } = useModeStore((store) => store);
	const isLocked = useSwipeLockStore((state) => state.isLocked);
	const setSettingsMode = useSettingsModeStore((store) => store.setMode);
	const settings = useSettingsStore((store) => store.settings);

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

	useEffect(() => {
		if (settings.autoSwitchSettingsMode) {
			if (mode == 'quiz') setSettingsMode('kvíz');
			if (mode == 'list') setSettingsMode('seznam');
		}
	}, [mode]);

	return (
		<div className='relative bg-dark fill-space overflow-x-hidden'>
			{poznavacka && getContent(poznavacka!).filter((f: any) => !isObject(f)).length > 0 ? (
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
	);
}
