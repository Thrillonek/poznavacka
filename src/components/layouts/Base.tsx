import { useEffect } from 'react';
import 'src/assets/_Base.scss';
import { useModeStore, usePoznavackaStore, useSettingsStore } from 'src/data';
import { useSettingsModeStore } from 'src/features/settings/data/stores';
import { useInitiateSwipeEvent } from 'src/hooks';
import { getContent, isObject } from 'src/utils';
import List from '../../features/list/components/List';
import Quiz from '../../features/quiz/components/Quiz';

export default function Base() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const mode = useModeStore((store) => store.mode);
	const setSettingsMode = useSettingsModeStore((store) => store.setMode);
	const settings = useSettingsStore((store) => store.settings);

	useInitiateSwipeEvent();

	useEffect(() => {
		if (settings.autoSwitchSettingsMode) {
			if (mode == 'quiz') setSettingsMode('kvíz');
			if (mode == 'list') setSettingsMode('seznam');
		}
	}, [mode]);

	return (
		<div className='relative bg-dark fill-space overflow-x-hidden'>
			{poznavacka && getContent(poznavacka!).filter((f: any) => !isObject(f)).length > 0 ? (
				<>
					<Quiz style={mode == 'list' ? { display: 'none' } : {}} />
					<List style={mode == 'quiz' ? { display: 'none' } : {}} />
				</>
			) : (
				<div className='flex-col gap-y-2 fill-space px-8 text-center center-content'>
					<h1 className='font-bold text-main text-4xl'>Poznávačka Tool</h1>
					<p className='text-muted text-xl'>Pro pokračování zvolte poznávačku (skupinu&nbsp;obrázků) ve výběru nalevo</p>
				</div>
			)}
		</div>
	);
}
