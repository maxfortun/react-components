import { useEffect, useState } from 'react';

import useRefElement from './useRefElement.js';

export function useRefMutationObserver(ref, options) {

	const element = useRefElement(ref);

	const [ mutations, setMutations ] = useState(null);

	if(!options) {
		options = { childList: true, subtree: true };
	}

	useEffect(() => {
		if(!element) {
			return;
		}

		const observer = new MutationObserver(_mutations => setMutations(_mutations));

		observer.observe(element, options);

		return () => observer.disconnect();
	}, [element]);

	return mutations;
}

export default useRefMutationObserver;
