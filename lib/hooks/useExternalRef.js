import { useRef, useEffect } from 'react';

export function useExternalRef(key, defaultValue, getExternalValue, setExternalValue) {
	const ref = useRef();

	if (ref.current === undefined) {
		const externalValue = getExternalValue();
		ref.current = externalValue != null ? externalValue : defaultValue;
	}

	useEffect(() => {
		setExternalValue(ref.current);
	}, [key]); 

	return ref;
}


export default useExternalRef;
