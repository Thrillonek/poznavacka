import { useEffect, useRef, useState, type ImgHTMLAttributes } from 'react';
import classes from 'src/assets/_ImageFit.module.scss';

type ImageFitProps = {
	onLoad?: () => void;
	calcFit?: boolean;
	allowLoading?: boolean;
	important?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

function ImageFit({ src, alt, onLoad, calcFit, allowLoading = true, style, important }: ImageFitProps) {
	const containerRef = useRef<HTMLElement>();
	const imageRef = useRef<HTMLImageElement>();

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
	}, [containerRef.current, calcFit]);

	return (
		<div ref={containerRef as any} data-loaded={false} className={classes['image-fit-container']}>
			<img style={style} fetchPriority={important ? 'high' : 'auto'} loading={important ? 'eager' : 'lazy'} onError={() => setIsError(true)} data-error={isError} onLoad={handleImageLoad} ref={imageRef as any} src={allowLoading ? src : ''} alt={alt} />
		</div>
	);
}

export default ImageFit;
