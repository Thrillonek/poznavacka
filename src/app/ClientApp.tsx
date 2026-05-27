import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Base from 'src/components/layouts/Base';
import ModeMenu from 'src/components/ui/ModeMenu';
import Toast from 'src/components/ui/Toast';
import MenuBar from 'src/features/file-system/components/MenuBar';
import Sidebar from 'src/features/file-system/components/Sidebar';
import Settings from 'src/features/settings/components/Settings';
import { useUpdateSearchParams } from 'src/hooks/useUpdateSearchParams';

export default function ClientApp() {
	const searchParams = useSearchParams();
	const updateSearchParams = useUpdateSearchParams();

	useEffect(() => {
		if (!searchParams.has('mode')) {
			updateSearchParams({ mode: 'quiz' });
		}
	}, []);

	return (
		<main>
			<Toast />
			<Settings />
			<Sidebar />
			<div className='main-content'>
				<MenuBar />
				<Base />
				<div className='lg:hidden z-30 bg-inherit p-2'>
					<ModeMenu />
				</div>
			</div>
		</main>
	);
}
