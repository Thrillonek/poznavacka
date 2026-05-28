import Image, { type StaticImageData } from 'next/image';
import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import classes from 'src/assets/_ImageFit.module.scss';

type ImageFitProps = {
	src: string;
	alt: string;
	onLoad?: () => void;
	calcFit?: boolean;
	important?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

function ImageFit({ src, alt, onLoad, calcFit, style, important, ...props }: ImageFitProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const [isError, setIsError] = useState(false);
	const [dims, setDims] = useState({ width: 0, height: 0 });

	function calcSize() {
		if (calcFit === false) return;
		if (containerRef.current == null || imageRef.current == null) return;

		setDims({ width: imageRef.current.naturalWidth, height: imageRef.current.naturalHeight });
	}

	function handleImageLoad() {
		if (onLoad) onLoad();
		containerRef.current?.setAttribute('data-loaded', 'true');
		calcSize();
	}

	useEffect(() => {
		calcSize();

		return () => setIsError(false);
	}, []);

	if (src && src.length > 0) {
		return (
			<div ref={containerRef} {...props} data-loaded={false} className={classes['image-fit-container']}>
				<div style={{ aspectRatio: `${dims.width || 16} / ${dims.height || 9}` }} className='relative h-full overflow-hidden'>
					<Image id={src} fill sizes='(max-width: 960px) 100vw, 60vw' style={{ ...style }} quality={75} loading={!important ? 'lazy' : 'eager'} onError={() => setIsError(true)} data-error={isError} onLoad={handleImageLoad} ref={imageRef} src={src} alt={alt} />
				</div>
			</div>
		);
	}
}

export default ImageFit;
