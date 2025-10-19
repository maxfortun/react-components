import useRefElement from './useRefElement.js';

export function useResizeObserver(ref, options) {

	useRefElement(
		ref,
		(element, callback) => {
			const observer = new ResizeObserver(entries => {
				callback(entries);
			});

			observer.observe(element, options);

			return () => observer.disconnect();
		},
	);

}

export default useResizeObserver;
