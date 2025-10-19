import { useState, useEffect } from 'react';

export function useResizeObserver(ref) {
	const [dimensions, setDimensions] = useState(null);

	useEffect(() => {
		const observeTarget = ref.current;
		if (!observeTarget) {
			return;
		}

		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				setDimensions(entry.contentRect);
			}
		});

		resizeObserver.observe(observeTarget);
		return () => resizeObserver.unobserve(observeTarget);
	}, [ref]);

	return dimensions;
}

export default useResizeObserver;
