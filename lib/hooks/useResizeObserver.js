import { useState } from 'react';

import useRefElement from './useRefElement.js';

export function useResizeObserver(ref, options) {
	const [result, setResult] = useState(null);

	useRefElement(
		ref,
		element => {
			const observer = new ResizeObserver(entries => {
				for (let entry of entries) {
					setResult(entry.contentRect);
				}
			});

			observer.observe(element, options);

			return observer.disconnect();
		},
	);

	return result;
}

export default useResizeObserver;
