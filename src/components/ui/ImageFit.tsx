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

	function calcSize() {
		if (calcFit === false) return;
		if (containerRef.current == null || imageRef.current == null) return;

		const containerRect = containerRef.current.getBoundingClientRect();
		const containerRatio = containerRect.width / containerRect.height;
		const imageRatio = imageRef.current.naturalWidth / imageRef.current.naturalHeight;

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

	useEffect(() => () => setIsError(false), []);

	useEffect(() => {
		calcSize();

		const resizeObserver = new ResizeObserver(() => calcSize());
		if (containerRef.current) resizeObserver.observe(containerRef.current);

		return () => resizeObserver.disconnect();
	}, [containerRef.current, calcFit, src]);

	if (src && src.length > 0)
		return (
			<div ref={containerRef} {...props} data-loaded={false} className={classes['image-fit-container']}>
				<Image style={style} loading={!important ? 'lazy' : 'eager'} onError={() => setIsError(true)} quality={75} data-error={isError} onLoad={handleImageLoad} ref={imageRef} src={src} alt={alt} />
			</div>
		);
}

export default ImageFit;
