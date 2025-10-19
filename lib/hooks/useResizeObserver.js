import { useEffect, useState } from 'react';

import useRefElement from './useRefElement.js';

export function useResizeObserver(ref, options) {

	const element = useRefElement(ref);

	const [ entries, setEntries ] = useState(null);

	useEffect(() => {
		if(!element) {
			return;
		}

		const observer = new ResizeObserver(entries => setEntries(entries));

		observer.observe(element, options);

		return () => observer.disconnect();
	}, [element]);

	return entries;
}

export default useResizeObserver;
