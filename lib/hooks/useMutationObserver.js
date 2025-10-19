import { useState, useEffect } from 'react';

export function useMutationObserver(ref) {
	const [mutations, setMutations] = useState(null);

	useEffect(() => {
		const observeTarget = ref.current;
		if (!observeTarget) {
			return;
		}

		const mutationObserver = new MutationObserver(_mutations => {
			setMutations(_mutations);
		});

		mutationObserver.observe(observeTarget, { childList: true, subtree: true });

		return () => mutationObserver.disconnect();
	}, [ref?.current]);

	return mutations;
}

export default useMutationObserver;
