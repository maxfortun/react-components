import { useRef, useMemo } from 'react';

export function useExternalRef(key, defaultValue, getExternalValue, setExternalValue) {
	const ref = useRef();

	if (ref.current === undefined) {
		const externalValue = getExternalValue();
		ref.current = externalValue != null ? externalValue : defaultValue;
	}

	const proxiedRef = useMemo(() => {
		return new Proxy(ref, {
			get(target, prop) {
				return target[prop];
			},
			set(target, prop, value) {
				target[prop] = value;
				if (prop === 'current') {
					setExternalValue(value);
				}
				return true;
			}
		});
	}, []);

	return proxiedRef;
}


export default useExternalRef;
