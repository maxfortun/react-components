import { useEffect } from 'react';

import useResizeObserver from './useResizeObserver.js';

export function useScrollOnResize(ref, behavior = 'smooth') {
	const dimensions = useResizeObserver(ref);

	useEffect(() => {
		if (!dimensions) {
			return;
		}

		ref.current.scrollTo({
			top: ref.current.scrollHeight,
			behavior
		});

	}, [dimensions]);
}

export default useScrollOnResize;
