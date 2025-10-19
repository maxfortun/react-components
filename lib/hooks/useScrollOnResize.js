import { useEffect } from 'react';

import useResizeObserver from './useResizeObserver.js';
import useMutationObserver from './useMutationObserver.js';

export function useScrollOnResize(ref, behavior = 'smooth') {
	const dimensions = useResizeObserver(ref);
	const mutations = useMutationObserver(ref);

	useEffect(() => {
		ref.current.scrollTo({
			top: ref.current.scrollHeight,
			behavior
		});
	}, [dimensions, mutations]);
}

export default useScrollOnResize;
