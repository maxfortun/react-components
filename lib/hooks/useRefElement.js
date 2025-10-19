import { useState, useLayoutEffect } from 'react';

export function useRefElement(ref) {
	const [element, setElement] = useState(null);

	useLayoutEffect(() => {
		let rafId;
		
		const tryObserve = () => {
			const _element = ref.current;
	  		if (!_element) {
				rafId = requestAnimationFrame(tryObserve);
				return;
	  		}
			setElement(_element);
		};

		tryObserve();

		return () => {
			if (rafId) {
				cancelAnimationFrame(rafId);
			}
		};

	}, [ref?.current]);

	return element;
}

export default useRefElement;
