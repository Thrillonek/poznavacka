import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import 'src/assets/_Base.scss';
import { usePoznavackaStore, useSettingsStore } from 'src/data';
import { getContent, isObject } from 'src/utils';
import List from '../../features/list/components/List';
import Quiz from '../../features/quiz/components/Quiz';

export default function Base() {
	const poznavacka = usePoznavackaStore((store) => store.poznavacka);
	const settings = useSettingsStore((store) => store.settings);

	const [searchParams, setSearchParams] = useSearchParams();

	const mode = useMemo(() => searchParams.get('mode'), [searchParams]);

	useEffect(() => {
		function handleUpdateSearchParams(sparams: URLSearchParams, mode: string) {
			sparams.set('settings', mode);
			return sparams;
		}

		if (settings.general.autoSwitchSettingsMode) {
			if (mode === 'quiz') setSearchParams((p) => handleUpdateSearchParams(p, 'kvíz'));
			if (mode === 'list') setSearchParams((p) => handleUpdateSearchParams(p, 'seznam'));
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
