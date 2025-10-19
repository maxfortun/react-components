import { useState, useLayoutEffect } from 'react';

export function useRefElement(ref, callback) {
	const [result, setResult] = useState(null);

	useLayoutEffect(() => {
		let rafId;
		
		const tryObserve = () => {
			const element = ref.current;
	  		if (!element) {
				rafId = requestAnimationFrame(tryObserve);
				return;
	  		}
	
			setResult(callback(element));
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

export default useRefElement;
