'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import 'src/assets/_main.scss';
import Base from 'src/components/layouts/Base';
import ModeMenu from 'src/components/ui/ModeMenu';
import { useFileSystemStore } from 'src/data';
import MenuBar from 'src/features/file-system/components/MenuBar';
import Sidebar from 'src/features/file-system/components/Sidebar';
import Settings from 'src/features/settings/components/Settings';
import Toast from '../../components/ui/Toast';

export default function App({ fileSystem }: any) {
	const [_, setSearchParams] = useSearchParams();

	useFileSystemStore((store) => (store as any).setFileSystem)(fileSystem);

	useEffect(() => {
		setSearchParams((params) => {
			if (!params.get('mode')) params.set('mode', 'quiz');
			return params;
		});
	}, []);

	return (
		<>
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
		</>
	);
}
