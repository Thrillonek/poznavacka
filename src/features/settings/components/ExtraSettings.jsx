import { Checkbox } from '@mui/material';
import { blue } from '@mui/material/colors';
import { useSettingsStore } from 'src/data';

function ExtraSettings() {
	const updateCoreSettings = useSettingsStore((store) => store.updateCoreSettings);

	<div className='mt-4 pt-4 border-neutral-600 border-t'>
		<div className='flex items-center'>
			<Checkbox
				sx={{
					color: blue[800],
					'&.Mui-checked': {
						color: blue[600],
					},
				}}
				onChange={(e) => updateCoreSettings('removeDuplicates', e.target.checked)}
			></Checkbox>
			<p className='font-semibold text-neutral-300'>Odstranit duplikované obrázky</p>
		</div>
		<div className='flex items-center'>
			<Checkbox
				sx={{
					color: blue[800],
					'&.Mui-checked': {
						color: blue[600],
					},
				}}
				onChange={(e) => updateCoreSettings('devMode', e.target.checked)}
			></Checkbox>
			<p className='font-semibold text-neutral-300'>Vývojařský režim (zobrazovat index obrázku)</p>
		</div>
	</div>;
}

export default ExtraSettings;
