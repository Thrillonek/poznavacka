import { useEffect, useRef } from 'react';
import classes from 'src/assets/_ImageFit.module.scss';

function ImageFit({ src, alt, onLoad }: { src: string; alt?: string; onLoad?: () => void }) {
	const containerRef = useRef<HTMLElement>();
	const imageRef = useRef<HTMLImageElement>();

	function calcSize() {
		if (containerRef.current == null || imageRef.current == null) return;

		const containerRect = containerRef.current.getBoundingClientRect();
		const containerRatio = containerRect.width / containerRect.height;
		const imageRatio = imageRef.current.naturalWidth / imageRef.current.naturalHeight;

		console.log(containerRatio, imageRatio, imageRef.current.src);

		if (containerRatio < imageRatio) {
			imageRef.current.setAttribute('data-wide', '1');
		} else {
			imageRef.current.setAttribute('data-wide', '0');
		}
	}

	function handleImageLoad() {
		if (onLoad) onLoad();
		containerRef.current?.setAttribute('data-loaded', 'true');
		calcSize();
	}

	useEffect(() => {
		calcSize();
	}, [containerRef.current]);

	return (
		<div ref={containerRef as any} id='image-fit-container' className={classes['image-fit-container']}>
			<img onLoad={handleImageLoad} ref={imageRef as any} id='image-fit' src={src} alt={alt} />
		</div>
	);
}

export default ImageFit;
