import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import 'src/assets/_Toast.scss';
import { useInformationStore } from 'src/data';

function Toast() {
	const title = useInformationStore((state) => state.title);
	const isVisible = useInformationStore((state) => state.isVisible);
	const hideInformation = useInformationStore((state) => state.hideInformation);

	useEffect(() => {
		if (isVisible) {
			setTimeout(() => {
				hideInformation();
			}, 3000);
		}
	}, [isVisible]);

	return (
		<button onClick={() => hideInformation()} data-visible={isVisible} className='toast-container'>
			<div className='toast-icon'>
				<Icon icon='mdi:checkbox-marked-circle-outline' />
			</div>
			<div className='divider-vertical'></div>
			<p>{title}</p>
		</button>
	);
}

export default Toast;
