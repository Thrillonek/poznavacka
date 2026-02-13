import { Icon } from '@iconify/react/dist/iconify.js';

function SupportSettings() {
	return (
		<>
			<div className='text-muted settings-section'>
				<h3>Kontakt</h3>
				<p>Pokud jsi v aplikaci narazil/a na nějakou chybu, máš nápad, jak aplikaci zlepšit (přidat nové funkce, atd.) nebo máš prostě dotaz na autora, tak neváhej a kontaktuj mě. Dávám tu více možností, ať si můžeš vybrat tu, která ti sedí nejvíc.</p>
				<a href='' className='flex gap-2 hover:underline'>
					<Icon icon='mdi:instagram' className='text-2xl' />
					<p>jindra_kraina_</p>
				</a>
				<a href='mailto:jindrich.kraina@gmail.com' className='flex gap-2 hover:underline'>
					<Icon icon='mdi:email' className='text-2xl' />
					<p>jindrich.kraina@gmail.com</p>
				</a>
			</div>
		</>
	);
}

export default SupportSettings;
