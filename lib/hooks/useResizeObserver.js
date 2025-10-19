import { useState, useLayoutEffect } from 'react';

export function useResizeObserver(ref, options) {
	const [dimensions, setDimensions] = useState(null);

	useLayoutEffect(() => {
		let observer;
		let rafId;
		
		const tryObserve = () => {
			const observable = ref.current;
	  		if (!observable) {
				rafId = requestAnimationFrame(tryObserve);
				return;
	  		}
	
			observer = new ResizeObserver(entries => {
				for (let entry of entries) {
					setDimensions(entry.contentRect);
				}
			});

			observer.observe(observable, options);
		};

		tryObserve();

		return () => {
			observer?.disconnect();
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};

	}, [ref?.current]);

	return dimensions;
}

export default useResizeObserver;
