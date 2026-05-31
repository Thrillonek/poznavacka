import { useEffect, useState } from 'react';

export default function PreloadImages({ srcArray }: { srcArray: string[] }) {
	const [loadIndex, setLoadIndex] = useState(0);

	useEffect(() => {
		setLoadIndex(0);
	}, [srcArray]);

	const createURL = (src: string) => (window.location.href.includes('localhost') ? src : `https://wsrv.nl/?url=${window.location.host + encodeURI(src)}&q=75&output=webp`);

	return <div className='fixed opacity-0 pointer-events-none'>{srcArray.map((src, idx) => loadIndex === idx && <img key={idx} src={createURL(src)} alt='' onLoad={() => setLoadIndex((prev) => prev + 1)} />)}</div>;
}
