import { useState, useLayoutEffect } from 'react';

export function useMutationObserver(ref, options) {
	const [mutations, setMutations] = useState(null);

	if(!options) {
		options = { childList: true, subtree: true };
	}

	useLayoutEffect(() => {
		let observer;
		let rafId;
		
		const tryObserve = () => {
			const observable = ref.current;
			if (!observable) {
				rafId = requestAnimationFrame(tryObserve);
				return;
			}
	
			observer = new MutationObserver(_mutations => {
				setMutations(_mutations);
			});

			observer.observe(observable, options);
		};

		tryObserve();

		return () => {
			observer?.disconnect();
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};

	}, [ref?.current]);

	return mutations;
}

export default useMutationObserver;
