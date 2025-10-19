import { useState, useLayoutEffect } from 'react';

export function useRefElement(ref, callback) {
	const [result, setResult] = useState(null);

	useLayoutEffect(() => {
		let rafId;
		let cleanup;
		
		const tryObserve = () => {
			const element = ref.current;
	  		if (!element) {
				rafId = requestAnimationFrame(tryObserve);
				return;
	  		}
			cleanup = callback(element, setResult);
		};

		tryObserve();

		return () => {
			if(cleanup) {
				cleanup();
			}
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};

	}, [ref?.current]);

	return result;
}

export default useRefElement;
