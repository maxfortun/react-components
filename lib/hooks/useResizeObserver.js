import useRefElement from './useRefElement.js';

export function useResizeObserver(ref, options) {
	return useRefElement(
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
}

export default useResizeObserver;
