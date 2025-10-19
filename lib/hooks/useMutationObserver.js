import { useState } from 'react';

import useRefElement from './useRefElement.js';

export function useRefMutationObserver(ref, options) {
	if(!options) {
		options = { childList: true, subtree: true };
	}

	const [result, setResult] = useState(null);

	useRefElement(
		ref,
		element => {
			const observer = new MutationObserver(_mutations => {
				setResult(_mutations);
			});

			observer.observe(element, options);

			return observer.disconnect();
		},
	);

	return result;
}

export default useRefMutationObserver;
