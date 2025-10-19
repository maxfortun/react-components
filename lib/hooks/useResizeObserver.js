import { useState } from 'react';

import useRefElement from './useRefElement.js';

export function useResizeObserver(ref, options) {
	const [result, setResult] = useState(null);

	useRefElement(
		ref,
		element => {
			const observer = new ResizeObserver(entries => {
				setResult(entries);
			});

			observer.observe(element, options);

			return () => observer.disconnect();
		},
	);

	return result;
}

export default useResizeObserver;
