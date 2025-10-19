import useWithRefElement from './useWithRefElement.js';

export function useResizeObserver(ref, options) {
	const [dimensions, setDimensions] = useWithRefElement(
		ref,
		element => {
			const observer = new ResizeObserver(entries => {
				for (let entry of entries) {
					setDimensions(entry.contentRect);
				}
			});

			observer.observe(element, options);

			return observer.disconnect();
		},
	);

	return dimensions;
}

export default useResizeObserver;
