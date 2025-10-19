import { useState, useLayoutEffect } from 'react';

export function useWithRef(ref, withRef, options) {
	const [result, setResult] = useState(null);

	useLayoutEffect(() => {
		let rafId;
		
		const tryObserve = () => {
			const element = ref.current;
	  		if (!element) {
				rafId = requestAnimationFrame(tryObserve);
				return;
	  		}
	
			setResult(withRef(ref, element, options));
		};

		tryObserve();

		return () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};

	}, [ref?.current]);

	return result;
}

export default useWithRef;
