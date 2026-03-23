import Card from 'src/components/form/Card';
import { useCompletedFilesStore, usePoznavackaStore } from 'src/data';
import { getContent } from 'src/utils';

function Stats() {
	const poznavacka = usePoznavackaStore((state) => state.poznavacka);
	const completedFiles = useCompletedFilesStore((state) => state.completedFiles);

	return (
		<>
			<div className='flex flex-wrap gap-4 *:grow'>
				<Card title='Délka zvolené poznávačky' content={poznavacka ? getContent(poznavacka).length : '?'} />
				<Card title='Počet naučených obrázků' content={completedFiles.length.toString()} />
				<Card title='Naučené obrázky v této poznávačce' content={poznavacka ? completedFiles.filter((x) => getContent(poznavacka).includes(x)).length.toString() : '0'} />
			</div>
		</>
	);
}

export default Stats;
